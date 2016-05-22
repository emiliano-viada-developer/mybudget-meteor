// Template: addTarget
var ERRORS_KEY = 'addTargetErrors';
// onCreated
Template.addTarget.onCreated(function() {
    Session.set(ERRORS_KEY, {});
});

var rules = {
    amount: {
        required: true
    }
};
var messages = {
    amount: {
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
Template.addTarget.onRendered(function() {
	// Process form (Creation)
    var validator = $('.add-target').validate({
        rules: rules,
        messages: messages,
        submitHandler: function(e) {
            var form = $(e), target, month;

            month = form.find('.target-month').val();
            year = form.find('.target-year').val();
            month = (month.length == 1)? '0' + month : month;
            target = {
            	month: year + '-' + month + '-15',
            	amount: parseFloat(form.find('.amount').val()),
            	points: parseFloat(form.find('.points').val())
            };

            Meteor.call('addTarget', target, function(error) {
            	if (!error) {
            		toastr.success("Objetivo creado exitosamente.");
            		form.find('.clean').trigger('click');
                    $('#myBudgetModal').modal('hide');
            	} else {
                    toastr.error("Hubo un error y el objetivo no se ha creado. Intenta nuevamente.");
                }
            });
        },
        invalidHandler: invalidHandler
    });

    // Process form (Edition)
    if (this.data && this.data.mode == 'edit') {
        ERRORS_KEY = 'editTargetErrors';
        Session.set(ERRORS_KEY, {});
        var validator = $('.edit-target').validate({
            rules: rules,
            messages: messages,
            submitHandler: function(e) {
                var form = $(e),
                    targetId = form.attr('data-target-id'), target;

                month = form.find('.target-month').val();
	            year = form.find('.target-year').val();
	            month = (month.length == 1)? '0' + month : month;
                target = {
                    month: year + '-' + month + '-15',
	            	amount: parseFloat(form.find('.amount').val()),
	            	points: parseFloat(form.find('.points').val())
                };

                Meteor.call('editTarget', targetId, target, function(error) {
                    if (!error) {
                        toastr.success("Objetivo editado exitosamente.");
                        $('#myBudgetModal').modal('hide');
                    } else {
                        toastr.error("Hubo un error al editar el objetivo. Intenta nuevamente.");
                    }
                });
            },
            invalidHandler: invalidHandler
        });
    }
});

// helpers
Template.addTarget.helpers({
	errorClass: function(key) {
        return Session.get(ERRORS_KEY)[key] && 'error';
    },
	months: function() {
		return monthLabels;
	},
	years: function() {
		var date = new Date(), currentYear = date.getFullYear();

		return [{key: currentYear-1, name: currentYear-1},
			{key: currentYear, name: currentYear},
			{key: currentYear+1, name: currentYear+1}
		];
	},
	mode: function() {
        return (this.target)? 'edit' : 'add';
    },
    getTargetId: function() {
        return (this.target)? this.target._id : null;
    },
	amount: function() {
        return (this.target)? this.target.amount : null;
    },
	points: function() {
        return (this.target)? this.target.points : 0;
    },
    modalMode: function() {
        return (this.target)? true : false;
    },
	selectedMonth: function() {
		var nMonth;

		if (Template.instance().data && Template.instance().data.target) {
			nMonth = parseInt(Template.instance().data.target.month.substr(5, 2));
		} else {
			nMonth = new Date().getMonth() + 1;
		}

		return nMonth;
	},
	selectedYear: function() {
		var nYear;

		if (Template.instance().data && Template.instance().data.target) {
			nYear = parseInt(Template.instance().data.target.month.substr(0, 4));
		} else {
			nYear = new Date().getFullYear();
		}

		return nYear;
	}
});

// Events
Template.addTarget.events({
	'submit form': function(e) {
        e.preventDefault();
    },
    'click .clean': function(e) {
    	e.preventDefault();
    	var form = $(e.currentTarget).closest('form');
    	form.find('.amount').val('');
    	form.find('.points').val(0);
		Session.set(ERRORS_KEY, {});
		$('label.error').hide();
    }
});
