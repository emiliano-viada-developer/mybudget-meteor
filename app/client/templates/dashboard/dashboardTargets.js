// Template: dashboardTargets

// Helpers
Template.dashboardTargets.helpers({
	targets: function() {
		return Targets.find({}, {limit: 3});
	}
});

// Events
Template.dashboardTargets.events({
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
