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
    },
    'click .add-category-link': function(e) {
        categories = Categories.find({}).fetch();
        Session.set('modal', {
            title: 'Agregar categoria',
            icon: 'fa-plus-square-o',
            body: 'addCategory',
            data: categories,
            saveBtn: {label: 'Agregar'},
            closeBtn: {label: 'Cerrar'}
        });
    }
});
