// Template: addEntry
// onRendered
Template.addEntry.onRendered(function() {
	// Chosen select http://harvesthq.github.io/chosen/
	var config = {
        '.chosen-select': {},
    }
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }

    // Data Picker https://github.com/eternicode/bootstrap-datepicker
    $('#date_1 .input-group.date').datepicker({
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
});

// helpers
Template.addEntry.helpers({
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
	}
});
