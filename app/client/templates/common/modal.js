// Template: modal

// onRendered
Template.modal.onRendered(function() {
	// Fix chosen plugin on modal
	$('#myBudgetModal').on('show.bs.modal', function () {
        $('.chosen-select', this).chosen('destroy').chosen({width: '100%'});
    });
});

// Helpers
Template.modal.helpers({
	title: function() {
		var modalSession = Session.get('modal');
		return (modalSession)? modalSession.title : '';
	},
	icon: function() {
		var modalSession = Session.get('modal');
		return (modalSession)? modalSession.icon : '';
	},
	description: function() {
		var modalSession = Session.get('modal');
		return (modalSession)? modalSession.description : '';
	},
	body: function() {
		var modalSession = Session.get('modal');
		return (modalSession)? modalSession.body : '';
	},
	data: function() {
		var modalSession = Session.get('modal');
		return (modalSession)? modalSession.data : {};
	},
	closeBtn: function() {
		var modalSession = Session.get('modal');
		return (modalSession)? modalSession.closeBtn : '';
	},
	saveBtn: function() {
		var modalSession = Session.get('modal');
		return (modalSession)? modalSession.saveBtn : '';
	}
});

// Events
Template.modal.events({
	'click .btn-save': function(e) {
        e.preventDefault();
        // Triger the submit event if there is a form in modal body
        var form = $('.modal-body').find('form');

        if (form) {
        	form.submit();
        }
    }
});
