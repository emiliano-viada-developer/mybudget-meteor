// Events
Template.topNavigation.events({
    'click .logout': function(e) {
        e.preventDefault();
        if (Meteor.userId()) {
            Meteor.logout(function(err) {
                if (!err) {
                    Router.go('home');
                }
            });
        }
    }
});
