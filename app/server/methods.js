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
	}
});
