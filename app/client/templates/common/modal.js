// Template: modal

// onRendered
Template.modal.onRendered(function() {
	// Fix chosen plugin on modal
	$('#myBudgetModal').on('shown.bs.modal', function () {
        $('.chosen-select', this).chosen('destroy').chosen({width: '100%', allow_single_deselect: true});
    });
    // Clean the modal when is closed
    $('#myBudgetModal').on('hidden.bs.modal', function() {
    	Session.set('modal', null);
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
	},
	editBtn: function() {
		var modalSession = Session.get('modal');
		return (modalSession)? modalSession.editBtn : '';
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
    },
    'click .btn-edit': function(e) {
    	var entryId = $(e.currentTarget).attr('data-entry-id'), entry;

    	entry = Entries.findOne({_id: entryId});
		if (entry) {
			Session.set('modal', {
				title: 'Editar movimiento',
				icon: 'fa-edit',
				body: 'editEntry',
				data: entry,
				saveBtn: {label: 'Editar'},
				closeBtn: {label: 'Cerrar'}
			});
			setTimeout(function() {
				$('.chosen-select').chosen('destroy').chosen({width: '100%', allow_single_deselect: true});
				$('.chosen-select').trigger("chosen:updated");
				$('.i-checks-edit').iCheck('update');
			}, 300);
		}
    }
});
