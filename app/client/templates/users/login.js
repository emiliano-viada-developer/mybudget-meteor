var ERRORS_KEY = 'loginErrors';

// Helpers
Template.login.helpers({
	errorClass: function(key) {
        return Session.get(ERRORS_KEY)[key] && 'error';
    }
});

// Events
Template.login.events({
    'submit form': function(e) {
        e.preventDefault();
    }
});

// onCreated
Template.login.onCreated(function() {
    Session.set(ERRORS_KEY, {});
});

// onRendered
Template.login.onRendered(function() {
    var validator = $('.login').validate({
        submitHandler: function(e) {
            var email = $('[name="email"]').val(),
                password = $('[name="password"]').val();

            Meteor.loginWithPassword(email, password, function(error) {
                if (error) {
                    var errors = {};
                    if (error.reason == "User not found") {
                        errors.email = error.reason;
                        validator.showErrors({
                            email: 'El usuario no existe'
                        });
                    }
                    if (error.reason == "Incorrect password") {
                        errors.password = error.reason;
                        validator.showErrors({
                            password: 'Contraseña incorrecta'
                        });
                    }
                    Session.set(ERRORS_KEY, errors);
                } else {
                    var currentRoute = Router.current().route.getName();
                    if (currentRoute == "login") {
                        Router.go("dashboard");
                    }
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
