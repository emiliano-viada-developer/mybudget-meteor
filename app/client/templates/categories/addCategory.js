// Template: addCategory

var ERRORS_KEY = 'addCategoryErrors';

// onCreated
Template.addCategory.onCreated(function() {
    Session.set(ERRORS_KEY, {});
});

var rules = {
    name: {
        required: true
    }
};
var messages = {
    name: {
        required: 'Este campo es requerido'
    }
};
var invalidHandler = function(event, validator) {
    setTimeout(function() {
        var errors = {};
        $.each(validator.currentForm, function(i, elem) {
            var input = $(elem);
            if (input.hasClass('error')) {
                errors[input.attr('name')] = 'error';
            }
        });
        if (errors) {
            Session.set(ERRORS_KEY, errors);
        }
    }, 100);
};
// onRendered
Template.addCategory.onRendered(function() {
	// Chosen select http://harvesthq.github.io/chosen/
	var config = {
        '.chosen-select': {width: '100%', allow_single_deselect: true},
    }
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }

    // Process form (Creation)
    var validator = $('.add-category').validate({
        rules: rules,
        messages: messages,
        submitHandler: function(e) {
            var form = $(e), category;

            category = {
            	parentId: form.find('.category').val(),
            	name: form.find('.name').val(),
            	description: form.find('.description').val()
            };

            Meteor.call('addCategory', category, function(error) {
            	if (!error) {
            		toastr.success("Categoria creada exitosamente.");
            		form.find('.clean').trigger('click');
                    $('#myBudgetModal').modal('hide');
            	} else {
                    toastr.error("Hubo un error y la categoria no se ha creado. Intenta nuevamente.");
                }
            });
        },
        invalidHandler: invalidHandler
    });

    // Process form (Edition)
    if (this.data.mode == 'edit') {
        ERRORS_KEY = 'editCategoryErrors';
        Session.set(ERRORS_KEY, {});
        var validator = $('.edit-category').validate({
            rules: rules,
            messages: messages,
            submitHandler: function(e) {
                var form = $(e),
                    categoryId = form.attr('data-category-id'), category;

                category = {
                    parentId: form.find('.category').val(),
                    name: form.find('.name').val(),
                    description: form.find('.description').val()
                };

                Meteor.call('editCategory', categoryId, category, function(error) {
                    if (!error) {
                        toastr.success("Categoria editada exitosamente.");
                        $('#myBudgetModal').modal('hide');
                    } else {
                        toastr.error("Hubo un error al editar la categoria. Intenta nuevamente.");
                    }
                });
            },
            invalidHandler: invalidHandler
        });
    }
});

// helpers
Template.addCategory.helpers({
	errorClass: function(key) {
        return Session.get(ERRORS_KEY)[key] && 'error';
    },
    categories: function() {
		return (this.categories)? this.categories : this;
	},
    mode: function() {
        return (this.categories)? 'edit' : 'add';
    },
    modalMode: function() {
        return (this.categories || Array.isArray(this))? true : false;
    },
    getCategoryId: function() {
        return (this.category)? this.category._id : null;
    },
    cName: function() {
        return (this.category)? this.category.name : null;
    },
    description: function() {
        return (this.category)? this.category.description : null;
    }
});

// Events
Template.addCategory.events({
	'submit form': function(e) {
        e.preventDefault();
    },
    'click .clean': function(e) {
    	e.preventDefault();
    	var form = $(e.currentTarget).closest('form'), fields = ['category', 'name', 'description'];
    	$.each(fields, function(index, field) {
		    form.find('.' + field).val('');
		});
		$('.chosen-select').trigger("chosen:updated");
		Session.set(ERRORS_KEY, {});
		$('label.error').hide();
    }
});
