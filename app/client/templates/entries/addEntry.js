// Template: addEntry

var ERRORS_KEY = 'addEntryErrors';

// onCreated
Template.addEntry.onCreated(function() {
    Session.set(ERRORS_KEY, {});
});

// onRendered
Template.addEntry.onRendered(function() {
	// Chosen select http://harvesthq.github.io/chosen/
	var config = {
        '.chosen-select': {},
    }
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }

    $('#date_1 .input-group.date').datepicker({
        language: 'es',
        format: 'dd/mm/yyyy',
        endDate: '0d',
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true
    });

    // iChecks
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });

    // Process form
    var validator = $('.add-entry').validate({
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
            var date = $('#date').val(), month, day, year, entry;

            day = date.substr(0, 2);
            month = date.substr(3, 2);
            year = date.substr(6, 4);
            date = month + '/' + day + '/' + year;

            entry = {
            	categoryId: $('#category').val(),
            	date: new Date(date),
            	haber: $('#haber').is(':checked'),
            	countable: $('#countable').is(':checked'),
            	value: parseFloat($('#value').val().replace('.', '').replace(',', '.')),
            	comment: $('#comment').val()
            };

            Meteor.call('addEntry', entry, function(error) {
            	if (!error) {
            		toastr.success("Movimiento creado exitosamente.");
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
Template.addEntry.helpers({
	errorClass: function(key) {
        return Session.get(ERRORS_KEY)[key] && 'error';
    },
	today: function() {
		var date = new Date(),
			day = date.getDate(),
			month = date.getMonth()+1;

		if (day.toString().length < 2) {
			day = '0' + day;
		}
		if (month.toString().length < 2) {
			month = '0' + month;
		}

		return day + '/' + month + '/' + date.getFullYear();
	},
	categories: function() {
		return this;
	}
});

// Events
Template.addEntry.events({
	'submit form': function(e) {
        e.preventDefault();
    },
    'click .clean': function(e) {
    	e.preventDefault();
    	var fields = ['category', 'value', 'comment'];
    	$.each(fields, function(index, field) {
		    $('#' + field).val('');
		});
		$('.chosen-select').trigger("chosen:updated");
		Session.set(ERRORS_KEY, {});
		$('label.error').hide();
		$('.haber.i-checks').iCheck('uncheck');
		$('.countable.i-checks').iCheck('check');
		$('#date_1 .input-group.date').datepicker('setDate', new Date());
    }
});
