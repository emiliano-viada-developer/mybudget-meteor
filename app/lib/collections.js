// Collections
Entries = new Meteor.Collection('entries');
Categories = new Meteor.Collection('categories');

// Helpers for Categories collecion
Categories.helpers({
  	getParent: function() {
        return Categories.findOne(this.parentId);
    }
});

// Helpers for Entries collecion
Entries.helpers({
  	getCategory: function() {
        return Categories.findOne(this.categoryId);
    }
});
