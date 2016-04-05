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
$.validator.setDefaults({ignore: ":hidden:not(.chosen-select)"});
$.validator.addMethod(
    'currency',
    function (value, element) {
        return this.optional(element) || /^\d+.\d{0,2}$/.test(value);
    },
    $.validator.messages.currency
);

// Toastr
toastr.options = {
    "closeButton": false,
    "debug": false,
    "progressBar": false,
    "preventDuplicates": false,
    "positionClass": "toast-top-right",
    "onclick": null,
    "showDuration": "400",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

// Overall helpers
// Function to return current year
UI.registerHelper('currentYear', function() {
    return new Date().getFullYear();
});
