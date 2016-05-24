// Template: targets

// helpers
Template.targets.helpers({
	targets: function() {
		return Targets.find({});
	}
});

// Events
Template.targets.events({
	'click .edit': function(e) {
		var link = $(e.currentTarget),
			targetId = link.attr('data-target-id'),
			target;

		target = Targets.findOne({_id: targetId});
		if (target) {
			Session.set('modal', {
				title: 'Editar objetivo mensual',
				icon: 'fa-edit',
				body: 'addTarget',
				data: {target: target, mode: 'edit'},
				saveBtn: {label: 'Editar'},
				closeBtn: {label: 'Cerrar'}
			});
		}

		return;
	},
	'click .delete': function(e) {
		var link = $(e.currentTarget),
			targetId = link.attr('data-target-id');

		swal({
            title: "¿Estas seguro?",
            text: "El objetivo mensual sera eliminado!",
            type: "error",
            showCancelButton: true,
            confirmButtonColor: "#f27474",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false
        }, function () {
            Meteor.call('removeTarget', targetId, function(error) {
            	if (!error) {
            		swal("Eliminado!", "El objetivo ha sido eliminado.", "success");
            	}
            });
        });
	}
});
