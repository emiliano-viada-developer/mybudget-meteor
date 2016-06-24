// Template: categoryChart
var months, byMonth, current = 0, previous = 0;

// onCreated
Template.categoryChart.onCreated(function() {
	// TODO: Make default category configurable
	var category = Categories.findOne({});
	Session.set('categoryChart', category);

	var help = Session.get('currentDate').split('-');
		months = getLastMonths(7, true);
		currentYear = help[2];

	var from = (months[months.length-1]+1) + '-01-' + (currentYear-1),
		to = help[1] + '-' + new Date(currentYear, help[1], 0).getDate() + '-' + currentYear;

	// Get balances by month
	Meteor.call('getMonthlyBalances', from, to, Session.get('categoryChart')._id, function(error, result) {
		if (!error) {
			byMonth = result;
			var cm = (String(help[1]).length == 1)? '0' + help[1] : help[1],
				pm = (String((help[1]-1)).length == 1)? '0' + (help[1]-1) : (help[1]-1),
				ycm = currentYear + '-' + cm,
				ypm = currentYear + '-' + pm;
			_.forEach(byMonth, function(obj, z) {
				if (obj._id == ycm) {
					current = obj.total;
				} else if (obj._id == ypm) {
					previous = obj.total;
				}
			});
		}
	});
});

// helpers
Template.categoryChart.helpers({
	categories: function() {
		return this;
	},
	category: function() {
		return Session.get('categoryChart');
	},
	lastEntry: function() {
		var category = Session.get('categoryChart'), entry;

		entry = Entries.findOne({categoryId: category._id}, {sort: {date: -1}});

		return (entry)? moment(entry.date).format('DD/MM/YYYY') : 'n/a';
	},
	getAverage: function() {
		return ReactiveMethod.call('getAverage', null, null, Session.get('categoryChart')._id);
	},
	currentBalance: function() {
		return current;
	},
	previousBalance: function() {
		return previous;
	}
});

// Events
Template.categoryChart.events({
	'change .category-chart-select': function(e) {
		var changedCategory, sel = e.currentTarget,
			id = sel.options[sel.selectedIndex].value;

		changedCategory = Categories.findOne({_id: id});
		if (changedCategory) {
			Session.set('categoryChart', changedCategory);
		} else {
			toastr.error("Hubo un error. Intentalo nuevamente.");
		}
	}
});

// onRendered
Template.categoryChart.onRendered(function() {
	// Last months chart
	monthLabels = [];

	_.forEach(months.slice(0).reverse(), function(key, i) {
		monthLabels.push(oMonthLabels[key]);
	});

	setTimeout(function() {
		var byMonthData = [], year = currentYear-1;
		_.forEach(months.slice(0).reverse(), function(key, i) {
			var month = (key+1), date, mhas = false;

			if (String(month).length == 1) {
				month = '0' + month;
			}
			if (key == 0) {
				year++;
			}
			date = year + '-' + month;
			_.forEach(byMonth, function(obj, z) {
				if (obj._id == date) {
					byMonthData.push(obj.total);
					mhas = true;
				}
			});
			if (!mhas) {
				byMonthData.push(0);
			}
		});

		var lineData = {
	        labels: monthLabels,
	        datasets: [
	            {
	                label: "Category chart",
	                fillColor: "rgba(26,179,148,0.5)",
	                strokeColor: "rgba(26,179,148,0.7)",
	                pointColor: "rgba(26,179,148,1)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(26,179,148,1)",
	                data: byMonthData
	            }
	        ]
	    };

	    var lineOptions = {
	        scaleShowGridLines: true,
	        scaleGridLineColor: "rgba(0,0,0,.05)",
	        scaleGridLineWidth: 1,
	        bezierCurve: true,
	        bezierCurveTension: 0.4,
	        pointDot: true,
	        pointDotRadius: 4,
	        pointDotStrokeWidth: 1,
	        pointHitDetectionRadius: 20,
	        datasetStroke: true,
	        datasetStrokeWidth: 2,
	        datasetFill: true,
	        responsive: true
	    };


	    var ctx = document.getElementById("lineChart").getContext("2d");
	    new Chart(ctx).Line(lineData, lineOptions);
    }, 300);
});
