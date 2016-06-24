// Template: lastMonthsChart
var currentYear, months, incomes, outcomes;

// onCreated
Template.lastMonthsChart.onCreated(function() {

	var help = Session.get('currentDate').split('-');
	months = getLastMonths(12, false);
	currentYear = help[2];

	var from = (months[months.length-1]+1) + '-01-' + (currentYear-1),
		to = (help[1]-1) + '-' + new Date(currentYear, (help[1]-1), 0).getDate() + '-' + currentYear;

	// Get incomes data
	Meteor.call('getMonthlyIncomes', from, to, function(error, result) {
		if (!error) {
			incomes = result;
		}
	});
	// Get outcomes data
	Meteor.call('getMonthlyOutcomes', from, to, function(error, result) {
		if (!error) {
			outcomes = result;
		}
	});
});

// onRendered
Template.lastMonthsChart.onRendered(function() {
	// Last months chart
	var monthLabels = [];

	_.forEach(months.slice(0).reverse(), function(key, i) {
		monthLabels.push(oMonthLabels[key]);
	});

	setTimeout(function() {
		var incomeData = [], outcomeData = [];
		var year = currentYear-1;
		_.forEach(months.slice(0).reverse(), function(key, i) {
			var month = (key+1), date, ihas = false, ohas = false;

			if (String(month).length == 1) {
				month = '0' + month;
			}
			if (key == 0) {
				year++;
			}
			date = year + '-' + month;
			_.forEach(incomes, function(obj, z) {
				if (obj._id == date) {
					incomeData.push(obj.total);
					ihas = true;
				}
			});
			_.forEach(outcomes, function(obj, x) {
				if (obj._id == date) {
					outcomeData.push(obj.total);
					ohas = true;
				}
			});
			if (!ihas) {
				incomeData.push(0);
			}
			if (!ohas) {
				outcomeData.push(0);
			}
		});

	    var lastMonthsData = {
	        labels: monthLabels,
	        datasets: [
	            {
	                label: "Gastos",
	                fillColor: "rgba(237,85,101,0.5)",
	                strokeColor: "rgba(237,85,101,1)",
	                pointColor: "rgba(237,85,101,1)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(237,85,101,1)",
	                data: outcomeData
	            },
	            {
	                label: "Ingresos",
	                fillColor: "rgba(26,179,148,0.5)",
	                strokeColor: "rgba(26,179,148,0.7)",
	                pointColor: "rgba(26,179,148,1)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(26,179,148,1)",
	                data: incomeData
	            }
	        ]
	    };

	    var lastMonthsOptions = {
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

	    var cty = document.getElementById("lastMonthsChart").getContext("2d"),
	        lastMonthsChart = new Chart(cty).Line(lastMonthsData, lastMonthsOptions);

	    $('#show-tab-1').on('shown.bs.tab', function(e) {
	        lastMonthsChart = new Chart(cty).Line(lastMonthsData, lastMonthsOptions);
	    }).on('hidden.bs.tab', function(e) {
	    	lastMonthsChart.destroy();
	    });
	}, 300);
});
