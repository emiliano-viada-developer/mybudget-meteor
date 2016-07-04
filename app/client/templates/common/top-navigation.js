// Template: topNavigation

var ACTIVE_ITEMS = 'activeItems';

// onCreated
Template.topNavigation.onCreated(function() {
    Session.set(ACTIVE_ITEMS, {'dashboard':'', 'categories':'', 'entries':'', 'targets':''});
});

var getActiveItems = function() {
    switch (Router.current().route.getName()) {
        case 'dashboard':
            items = {'dashboard':true, 'categories':'', 'entries':'', 'targets':''}
            break;
        case 'categories':
            items = {'dashboard':'', 'categories':true, 'entries':'', 'targets':''}
            break;
        case 'entries':
            items = {'dashboard':'', 'categories':'', 'entries':true, 'targets':''}
            break;
        case 'targets':
            items = {'dashboard':'', 'categories':'', 'entries':'', 'targets':true}
            break;
        default:
            items = {'dashboard':'', 'categories':'', 'entries':'', 'targets':''}
            break;
    }
    Session.set(ACTIVE_ITEMS, items);
};

// helpers
Template.topNavigation.helpers({
    getActiveItem: function(key) {
        getActiveItems();
        return Session.get(ACTIVE_ITEMS)[key] && 'active';
    }
});

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
    },
    'click .add-target-link': function() {
        Session.set('modal', {
            title: 'Agregar Objetivo Mensual',
            icon: 'fa-plus-square-o',
            body: 'addTarget',
            data: [],
            saveBtn: {label: 'Agregar'},
            closeBtn: {label: 'Cerrar'}
        });
    }
});
