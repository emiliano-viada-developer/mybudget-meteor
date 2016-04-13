// Publications
Meteor.publish('entries', function() {
	var currentUser = this.userId;
	return Entries.find({ownerId: currentUser});
});
