// Collections
Entries = new Meteor.Collection('entries');
Categories = new Meteor.Collection('categories');

// Helpers for Categories collecion
Categories.helpers({
  	getParent: function() {
        return Categories.findOne(this.parentId);
    }
});
