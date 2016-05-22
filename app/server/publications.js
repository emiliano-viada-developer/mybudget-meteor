// Publications
Meteor.publish('entries', function() {
	var currentUser = this.userId;
	return Entries.find({ownerId: currentUser});
});

Meteor.publish('categories', function() {
	var currentUser = this.userId;
	return Categories.find({ownerId: currentUser});
});

Meteor.publish('targets', function() {
	var currentUser = this.userId;
	return Targets.find({ownerId: currentUser});
});
