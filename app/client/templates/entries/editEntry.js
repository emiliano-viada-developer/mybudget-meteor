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
});

// helpers
Template.editEntry.helpers({
	errorClass: function(key) {
        return Session.get(ERRORS_KEY)[key] && 'error';
    },
	categories: function() {
		return [{_id: 'cat-a', 'name': 'Category A'}, {_id: 'cat-b', 'name': 'Category B'}];
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
        e.preventDefault();console.log('Submitted form');
    }
});
