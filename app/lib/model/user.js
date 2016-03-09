// Helpers for Meteor.Users collecion
Meteor.users.helpers({
  	getFullName: function() {
        var name = 'unknown';

        if (this) {
            if (this.profile) {
                name = this.profile.name;
            } else if (this.emails.length) {
                name = this.emails[0].address;
            }
        }

        return name;
    }
});
