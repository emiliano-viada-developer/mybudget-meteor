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

// Datepicker
// Data Picker https://github.com/eternicode/bootstrap-datepicker
$.fn.datepicker.dates['es'] = {
    days: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
    daysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
    daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    today: "Hoy",
    clear: "Limpiar",
    format: "dd/mm/yyyy",
    titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
    weekStart: 0
};

// Overall helpers
// Function to return current year
UI.registerHelper('currentYear', function() {
    return new Date().getFullYear();
});

// Function to format date with momentJS
UI.registerHelper('formatDate', function(date, format) {
    var r = null;
    if (date && format) {
        r = moment(date).format(format);
    }
    return r;
});

// Format currency, just change decimal separator for now
UI.registerHelper('formatCurrency', function(value) {
    return '$' + new String(value).replace('.', ',');
});

// Function to check which dropdown's option is selected
UI.registerHelper('selected', function(a, b) {
    var selected = (a == b)? 'selected' : '';
    return selected;
});
