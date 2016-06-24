// Template: monthlyTargetsChart
var currentYear, targets, months;

// onCreated
Template.monthlyTargetsChart.onCreated(function() {

    var help = Session.get('currentDate').split('-');
    months = getLastMonths(12, false);
    currentYear = help[2];

    var from = (months[months.length-1]+1) + '-01-' + (currentYear-1),
        to = (help[1]-1) + '-' + new Date(currentYear, (help[1]-1), 0).getDate() + '-' + currentYear;

    // Get monthly targets
    Meteor.call('getTargets', from, to, function(error, result) {
        if (!error) {
            targets = result;
        }
    });
});

// onRendered
Template.monthlyTargetsChart.onRendered(function() {
	// monthly targets chart
    var monthLabels = [];

    _.forEach(months.slice(0).reverse(), function(key, i) {
        monthLabels.push(oMonthLabels[key]);
    });

    setTimeout(function() {
        var targetsData = [];
        var year = currentYear-1;
        _.forEach(months.slice(0).reverse(), function(key, i) {
            var month = (key+1), date, thas = false;

            if (String(month).length == 1) {
                month = '0' + month;
            }
            if (key == 0) {
                year++;
            }
            date = year + '-' + month;
            _.forEach(targets, function(obj, z) {
                if (obj.month.substr(0, 7) == date) {
                    targetsData.push(obj.points);
                    thas = true;
                }
            });
            if (!thas) {
                targetsData.push(0);
            }
        });

        var monthlyTargetsData = {
            labels: monthLabels,
            datasets: [
                {
                    label: "Objetivos mensuales",
                    fillColor: "rgba(26,179,148,0.5)",
                    strokeColor: "rgba(26,179,148,0.7)",
                    pointColor: "rgba(26,179,148,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(26,179,148,1)",
                    data: targetsData
                }
            ]
        };

        var monthlyTargetsOptions = {
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
            scaleBeginAtZero: false,
            datasetFill: true,
            responsive: true
        };

        var ctz = document.getElementById("monthlyTargetsChart").getContext("2d"),
            monthlyTargetsChart;

        $('#show-tab-2').on('shown.bs.tab', function(e) {
            monthlyTargetsChart = new Chart(ctz).Bar(monthlyTargetsData, monthlyTargetsOptions);
        }).on('hidden.bs.tab', function(e) {
        	monthlyTargetsChart.destroy();
        });
    }, 300);
});
