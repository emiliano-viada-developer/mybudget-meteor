// Template: entries

// Helpers
Template.entries.helpers({
	entries: function () {
		return Entries.find({});
	},
	categories: function() {
		return [{_id: 'cat-a', 'name': 'Category A'}, {_id: 'cat-b', 'name': 'Category B'}];
	}
});

// onRendered
Template.entries.onRendered(function() {
	// Footable
	$('.footable').footable();
});

// Events
Template.entries.events({
	'click .view': function(e) {
		var link = $(e.currentTarget),
			entryId = link.attr('data-entry-id'),
			entry;

		entry = Entries.findOne({_id: entryId});
		if (entry) {
			Session.set('modal', {
				title: 'Ver movimiento',
				icon: 'fa-eye',
				body: 'viewEntry',
				data: entry,
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
		}

		return;
	}
});
