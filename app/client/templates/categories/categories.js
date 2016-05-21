// Template: categories

// Helpers
Template.categories.helpers({
	categories: function () {
		return Categories.find({});
	}
});

// onRendered
Template.categories.onRendered(function() {
	// Footable
	$('.footable').footable();
});

// Events
Template.categories.events({
	'click .edit': function(e) {
		var link = $(e.currentTarget),
			categoryId = link.attr('data-category-id'),
			category;

		category = Categories.findOne({_id: categoryId});
		if (category) {
			Session.set('modal', {
				title: 'Editar categoria',
				icon: 'fa-edit',
				body: 'addCategory',
				data: {categories: Categories.find({}).fetch(), category: category, mode: 'edit'},
				saveBtn: {label: 'Editar'},
				closeBtn: {label: 'Cerrar'}
			});
			setTimeout(function() { $('.chosen-select').trigger("chosen:updated"); }, 300);
		}

		return;
	},
	'click .delete': function(e) {
		var link = $(e.currentTarget),
			categoryId = link.attr('data-category-id');

		swal({
            title: "¿Estas seguro?",
            text: "La categoria y sus categorias hijas (si existen) seran eliminadas!",
            type: "error",
            showCancelButton: true,
            confirmButtonColor: "#f27474",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false
        }, function () {
            Meteor.call('removeCategory', categoryId, function(error) {
            	if (!error) {
            		swal("Eliminado!", "La categoria ha sido eliminada.", "success");
            		$('.chosen-select').trigger("chosen:updated");
            	}
            });
        });
	}
});
