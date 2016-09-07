// Template: dashboardTargets

// Helpers
Template.dashboardTargets.helpers({
	targets: function() {
		return Targets.find({}, {sort: {month: -1}, limit: 3});
	},
    getBalance: function(month) {
        const react = true;
        let eom = moment(month).endOf('month');

        return formatCurrency(ReactiveMethod.call('getBalance', null, eom.format(), react));
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
