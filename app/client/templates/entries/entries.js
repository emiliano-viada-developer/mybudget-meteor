// Template: entries

// Helpers
Template.entries.helpers({
	entries: function () {
		return Entries.find({});
	},
	categories: function() {
		return [];
	}
});

// onRendered
Template.entries.onRendered(function() {
	// Footable
	$('.footable').footable();
});
