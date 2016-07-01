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

dayLabels = {0: 'Domingo', 1: 'Lunes', 2: 'Martes', 3: 'Miercoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sabado'};

oMonthLabels = {0: 'Enero', 1: 'Febrero', 2: 'Marzo', 3: 'Abril', 4: 'Mayo', 5: 'Junio',
            6: 'Julio', 7: 'Agosto', 8: 'Septiembre', 9: 'Octubre', 10: 'Noviembre', 11: 'Diciembre'};

monthLabels = [{key: 1, name: 'Enero'}, {key: 2, name: 'Febrero'}, {key: 3, name: 'Marzo'},
            {key: 4, name: 'Abril'}, {key: 5, name: 'Mayo'}, {key: 6, name: 'Junio'},
            {key: 7, name: 'Julio'}, {key: 8, name: 'Agosto'}, {key: 9, name: 'Septiembre'},
            {key: 10, name: 'Octubre'},{key: 11, name: 'Noviembre'},{key: 12, name: 'Diciembre'}];


var getCurrentDate = function() {
    var d = new Date(),
        month = parseInt(d.getMonth())+1;
        date = d.getDate() + '-' + month + '-' + d.getFullYear();

    return date;
};
// update currentDate every minute
Session.set("currentDate", getCurrentDate());
Meteor.setInterval(function() {
    Session.set("currentDate", getCurrentDate());
}, 60000);

// Global function to get x last months
getLastMonths = function(amount, fromCurrent) {
    var amount = amount || 12, rest = (fromCurrent)? 1 : 2, m,
        help = Session.get('currentDate').split('-'), cur = help[1] - rest;

    months = [];

    for (var i = 0; i < amount; i++) {
        m = cur - i;
        if (m < 0) {
            m = m + 12;
        }
        months.push(m);
    }

    return months;
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

formatNumber = function(value) {
    var tf = (value % 1 != 0)? 2 : 0;
    return parseFloat(value).toFixed(tf).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
// Format number
UI.registerHelper('formatNumber', function(value) {
    return formatNumber(value);
});
// Format currency
UI.registerHelper('formatCurrency', function(value) {
    var ret;

    if (value >= 0) {
        ret = '$' + formatNumber(value);
    } else {
        ret = formatNumber(value).replace('-', '-$');
    }

    return ret;
});

// Function to check which dropdown's option is selected
UI.registerHelper('selected', function(a, b) {console.log(a, b);
    var selected = (a == b)? 'selected' : '';
    return selected;
});

// Function to colored the text
UI.registerHelper('colored', function(value) {
    var className = '';

    if (value > 0) {
        className = 'text-navy';
    } else if (value < 0) {
        className = 'text-danger';
    }

    return className;
});

UI.registerHelper('getMonthName', function(month) {
    var nm = month.substr(5, 2), year = month.substr(0, 4), monthLabel;

    nm = (nm[0] == 0)? nm.replace('0', '') : nm;
    $.each(monthLabels, function(index, obj) {
        if (obj.key == nm) {
            monthLabel = obj.name;
        }
    });

    return monthLabel + ' ' + year;
});
