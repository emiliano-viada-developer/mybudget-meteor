var ERRORS_KEY = 'joinErrors';

// Helpers
Template.join.helpers({
	currentYear: function() {
		return new Date().getFullYear();
	},
	errorClass: function(key) {
        return Session.get(ERRORS_KEY)[key] && 'error';
    }
});

// Events
Template.join.events({
    'submit form': function(e) {
        e.preventDefault();
    }
});

// onCreated
Template.join.onCreated(function() {
    Session.set(ERRORS_KEY, {});
});

// onRendered hook
Template.join.onRendered(function() {
    var validator = $('.join').validate({
        rules: {
            confirm: {
                equalTo: '#password'
            }
        },
        submitHandler: function(e) {
            var email = $('[name="email"]').val(),
                password = $('[name="password"]').val();
            Accounts.createUser({
                email: email,
                password: password
            }, function(error) {
                if (error) {
                    var errors = {};
                    if (error.reason == "Email already exists.") {
                        errors.email = error.reason;
                        validator.showErrors({
                            email: "El email ya se encuentra registrado por otro usuario."
                        });
                    }
                    Session.set(ERRORS_KEY, errors);
                } else {
                    Router.go('home');
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
