// Set validator defaults
$.validator.setDefaults({
    rules: {
        password: {
            minlength: 6
        }
    },
    messages: {
        email: {
            required: 'Este campo es requerido',
            email: 'Por favor, ingresa un email valido'
        },
        password: {
            required: 'Este campo es requerido',
            minlength: 'Por favor, ingresa al menos {0} caracteres'
        },
        confirm: {
            required: 'Este campo es requerido',
            minlength: 'Por favor, ingresa al menos {0} caracteres',
            equalTo: 'Las contraseñas no coindiden'
        },
        terms: {
            required: 'Este campo es requerido'
        }
    }
});

// Overall helpers
// Function to return current year
UI.registerHelper('currentYear', function() {
    return new Date().getFullYear();
});
