// Template: dashboardTargets

// Helpers
Template.dashboardTargets.helpers({
	targets: function() {
		return Targets.find({}, {limit: 3});
	},
	colored: function(value) {
		var className = '';

		if (value > 0) {
			className = 'text-navy';
		} else if (value < 0) {
			className = 'text-danger';
		}

		return className;
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
