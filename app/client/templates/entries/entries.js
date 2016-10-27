// Template: entries

// Helpers
Template.entries.helpers({
	entries: function () {
		return Entries.find({}, {sort: {date: -1}, limit: 1000});
	},
	categories: function() {
		return Categories.find({});
	}
});

// onRendered
Template.entries.onRendered(function() {
	// Footable
	$('.footable').footable({limitNavigation: 5});
});

// Events
Template.entries.events({
	'click .view': function(e) {
		var link = $(e.currentTarget),
			entryId = link.attr('data-entry-id'),
			entry;

		entry = Entries.findOne({_id: entryId});
		entry.categoryName = entry.getCategory().name;
		if (entry) {
			Session.set('modal', {
				title: 'Ver movimiento',
				icon: 'fa-eye',
				body: 'viewEntry',
				data: entry,
				editBtn: {label: 'Editar'},
				closeBtn: {label: 'Cerrar'}
			});
		}

		return;
	},
	'click .edit': function(e) {
		var link = $(e.currentTarget),
			entryId = link.attr('data-entry-id'),
			entry;

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
				$('.chosen-select').trigger("chosen:updated");
				$('.i-checks-edit').iCheck('update');
			}, 300);
		}

		return;
	},
	'click .delete': function(e) {
		var link = $(e.currentTarget),
			entryId = link.attr('data-entry-id');

		swal({
            title: "¿Estas seguro?",
            text: "El movimiento sera eliminado!",
            type: "error",
            showCancelButton: true,
            confirmButtonColor: "#f27474",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false
        }, function () {
            Meteor.call('removeEntry', entryId, function(error) {
            	if (!error) {
            		swal("Eliminado!", "El movimiento ha sido eliminado.", "success");
            	}
            });
        });
	}
});
