// Methods
Meteor.methods({
	'addEntry': function(entry) {
		var currentUser = Meteor.userId();

		if (currentUser) {
			check(entry, {categoryId: String, date: Date, haber: Boolean, countable: Boolean, value: Number, comment: String});
			entry.ownerId = currentUser;
			entry.createdAt = new Date();
			entry.updatedAt = new Date();

			Entries.insert(entry);

		} else {
			throw new Meteor.Error("not-logged-in", "You're not logged-in.");
		}
	},
	'editEntry': function(entryId, entry) {
		var currentUser = Meteor.userId();

		if (currentUser) {
			check(entry, {categoryId: String, date: Date, haber: Boolean, countable: Boolean, value: Number, comment: String});
			entry.updatedAt = new Date();

			Entries.update({_id: entryId, ownerId: currentUser}, {$set: entry});

		} else {
			throw new Meteor.Error("not-logged-in", "You're not logged-in.");
		}
	},
	'removeEntry': function(entryId) {
		var currentUser = Meteor.userId();

		if (currentUser) {

			Entries.remove({_id: entryId, ownerId: currentUser});

		} else {
			throw new Meteor.Error("not-logged-in", "You're not logged-in.");
		}
	}
});
