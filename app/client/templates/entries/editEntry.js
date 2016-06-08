// Template: editEntry

var ERRORS_KEY = 'editEntryErrors';

// onCreated
Template.editEntry.onCreated(function() {
    Session.set(ERRORS_KEY, {});
});

// onRendered
Template.editEntry.onRendered(function() {
	$('.i-checks-edit').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });

    $('.input-group.datepicker').datepicker({
	    language: 'es',
	    format: 'dd/mm/yyyy',
	    endDate: '0d',
	    todayBtn: "linked",
	    keyboardNavigation: false,
	    forceParse: false,
	    calendarWeeks: true,
	    autoclose: true
	});

    // Since we render this template in a modal, fix it
    $('.chosen-select', this).chosen('destroy').chosen({width: '100%', allow_single_deselect: true});

	// Process form
    var validator = $('.edit-entry').validate({
        rules: {
            category: {
                required: true
            },
            date: {
            	required: true
            },
            value: {
                required: true,
                currency: true
            }
        },
        messages: {
        	category: {
	            required: 'Este campo es requerido'
	        },
	        date: {
	            required: 'Este campo es requerido'
	        },
	        value: {
	            required: 'Este campo es requerido',
	            currency: 'Valor invalido'
	        }
        },
        submitHandler: function(e) {
            var date = $('#date-edit').val(), month, day, year, entry,
            	form = $('.edit-entry'), entryId = form.attr('data-entry-id');

            day = date.substr(0, 2);
            month = date.substr(3, 2);
            year = date.substr(6, 4);
            date = month + '/' + day + '/' + year;

            entry = {
            	categoryId: $('#category-edit').val(),
            	date: new Date(date),
            	haber: $('#haber-edit').is(':checked'),
            	countable: $('#countable-edit').is(':checked'),
            	value: parseFloat($('#value-edit').val().replace('.', '').replace(',', '.')),
            	comment: $('#comment-edit').val()
            };

            Meteor.call('editEntry', entryId, entry, function(error) {
            	if (!error) {
            		toastr.success("Movimiento editado exitosamente.");
					$('#myBudgetModal').modal('hide');
                    var ae = (Session.get('addedEntry'))? Session.get('addedEntry') : 0;
                    Session.set('addedEntry', ae++);
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
Template.editEntry.helpers({
	errorClass: function(key) {
        return Session.get(ERRORS_KEY)[key] && 'error';
    },
	categories: function() {
		return Categories.find({});
	},
	isHaber: function() {
		$('.i-checks-edit').iCheck('update');
		return (this.haber)? 'checked' : '';
	},
	isCountable: function() {
		$('.i-checks-edit').iCheck('update');
		return (this.countable)? 'checked' : '';
	}
});

// Events
Template.editEntry.events({
	'submit form': function(e) {
        e.preventDefault();
    }
});
