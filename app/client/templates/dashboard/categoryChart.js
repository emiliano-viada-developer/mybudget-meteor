// Template: categoryChart
var defaultCategory, months, byMonth, categoryChart;

var getMonthlyBalances = function(category) {
    Session.set('categoryCurrentBalance', 0);
    Session.set('categoryPrevBalance', 0);

    var help = Session.get('currentDate').split('-'),
        backs = (Session.get('innerWidth') < 480)? 3 : 7;
        months = getLastMonths(backs, true);
        currentYear = help[2];

    var from = (months[months.length-1]+1) + '-01-' + (currentYear-1),
        to = help[1] + '-' + new Date(currentYear, help[1], 0).getDate() + '-' + currentYear;

    // Get balances by month
    Meteor.call('getMonthlyBalances', from, to, category._id, function(error, result) {
        if (!error) {
            byMonth = result;
            var cm = (String(help[1]).length == 1)? '0' + help[1] : help[1],
                pm = (String((help[1]-1)).length == 1)? '0' + (help[1]-1) : (help[1]-1),
                ycm = currentYear + '-' + cm,
                ypm = currentYear + '-' + pm;
            _.forEach(byMonth, function(obj, z) {
                if (obj._id == ycm) {
                    Session.set('categoryCurrentBalance', obj.total);
                } else if (obj._id == ypm) {
                    Session.set('categoryPrevBalance', obj.total);
                }
            });
        }
    });
};

// onCreated
Template.categoryChart.onCreated(function() {
	// TODO: Make default category configurable
	defaultCategory = Categories.findOne({});
	Session.set('categoryChart', defaultCategory);

	getMonthlyBalances(defaultCategory);
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
		return Session.get('categoryCurrentBalance');
	},
	previousBalance: function() {
		return Session.get('categoryPrevBalance');
	},
    getBalancePerc: function(current = true) {
        let balance = (current)? Session.get('categoryCurrentBalance') : Session.get('categoryPrevBalance');
        let average = ReactiveMethod.call('getAverage', null, null, Session.get('categoryChart')._id);

        return (balance < average)? Math.round((balance/average)*100) : 100;
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
			// Default to default category
            Session.set('categoryChart', defaultCategory);
		}

        getMonthlyBalances(Session.get('categoryChart'));
        setTimeout(function() {
            var newData = getByMonthData();
            _.forEach(newData, function(val, i) {
                categoryChart.datasets[0].points[i].value = val;
            });
            categoryChart.update(300);
        }, 300);
	}
});

var getByMonthData = function() {
    var data = [], year = currentYear-1;
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
                data.push(obj.total);
                mhas = true;
            }
        });
        if (!mhas) {
            data.push(0);
        }
    });

    return data;
};

// onRendered
Template.categoryChart.onRendered(function() {
	// Last months chart
	monthLabels = [];

	_.forEach(months.slice(0).reverse(), function(key, i) {
		monthLabels.push(oMonthLabels[key]);
	});

	setTimeout(function() {
		var byMonthData = getByMonthData();

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
            scaleLabel : "<%=formatCurrency(value)%>",
	        bezierCurve: true,
	        bezierCurveTension: 0.4,
	        pointDot: true,
	        pointDotRadius: 4,
	        pointDotStrokeWidth: 1,
	        pointHitDetectionRadius: 20,
	        datasetStroke: true,
	        datasetStrokeWidth: 2,
	        datasetFill: true,
	        responsive: true,
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= formatCurrency(value) %>"
	    };

        var ctx = document.getElementById("lineChart").getContext("2d");
        categoryChart = new Chart(ctx).Line(lineData, lineOptions);
    }, 300);
});
