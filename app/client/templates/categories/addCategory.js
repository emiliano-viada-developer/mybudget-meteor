// Template: addCategory

var ERRORS_KEY = 'addCategoryErrors';

// onCreated
Template.addCategory.onCreated(function() {
    Session.set(ERRORS_KEY, {});
});

// onRendered
Template.addCategory.onRendered(function() {
	// Chosen select http://harvesthq.github.io/chosen/
	var config = {
        '.chosen-select': {},
    }
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }

    // Process form
    var validator = $('.add-category').validate({
        rules: {
            name: {
                required: true
            }
        },
        messages: {
        	name: {
	            required: 'Este campo es requerido'
	        }
        },
        submitHandler: function(e) {
            var category;

            category = {
            	parentId: $('#category').val(),
            	name: $('#name').val(),
            	description: $('#description').val()
            };

            Meteor.call('addCategory', category, function(error) {
            	if (!error) {
            		toastr.success("Categoria creada exitosamente.");
            		$('.clean').trigger('click');
            	}
            });
        },
        invalidHandler: function(event, validator) {
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
        }
    });
});

// helpers
Template.addCategory.helpers({
	errorClass: function(key) {
        return Session.get(ERRORS_KEY)[key] && 'error';
    },
    categories: function() {
		return (this.categories)? this.categories : this;
	}
});

// Events
Template.addCategory.events({
	'submit form': function(e) {
        e.preventDefault();
    },
    'click .clean': function(e) {
    	e.preventDefault();
    	var fields = ['category', 'name', 'description'];
    	$.each(fields, function(index, field) {
		    $('#' + field).val('');
		});
		$('.chosen-select').trigger("chosen:updated");
		Session.set(ERRORS_KEY, {});
		$('label.error').hide();
    }
});
