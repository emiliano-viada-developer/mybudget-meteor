// Template: monthlyTargetsChart
var currentYear, targets, months;

// onCreated
Template.monthlyTargetsChart.onCreated(function() {

    var help = Session.get('currentDate').split('-'),
        backs = (Session.get('innerWidth') < 480)? 6 : 12;
    months = getLastMonths(backs, false);
    currentYear = help[2];

    let fromYear = (months[months.length-1] > months[0])? (currentYear-1) : currentYear,
        fromMonthAux = (months[months.length-1]+1),
        fromMonth = (fromMonthAux.length > 1)? fromMonthAux : '0' + fromMonthAux,
        fromDate = fromMonth + '-01-' + fromYear,
        toMonthAux = help[1]-1,
        toMonth = (toMonthAux.length > 1)? toMonthAux : '0' + toMonthAux,
        toDate = toMonth + '-' + new Date(currentYear, toMonthAux, 0).getDate() + '-' + currentYear;

    // Get monthly targets
    Meteor.call('getTargets', fromDate, toDate, function(error, result) {
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
                if (obj.month.toISOString().substr(0, 7) == date) {
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
            scaleLabel : "<%=formatNumber(value)%>",
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
            responsive: true,
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= formatNumber(value) %>"
        };

        var ctz = document.getElementById("monthlyTargetsChart").getContext("2d"),
            monthlyTargetsChart;

        $('#show-tab-2').on('shown.bs.tab', function(e) {
            monthlyTargetsChart = new Chart(ctz).Bar(monthlyTargetsData, monthlyTargetsOptions);
            // Check if we should change color for negative values
            var shouldChange = false;
            _.forEach(monthlyTargetsChart.datasets[0].bars, function(item, i) {
                if (item.value < 0) {
                    monthlyTargetsChart.datasets[0].bars[i].fillColor = "rgba(237,85,101,0.5)";
                    monthlyTargetsChart.datasets[0].bars[i].strokeColor = "rgba(237,85,101,0.7)";
                    monthlyTargetsChart.datasets[0].bars[i].pointColor = "rgba(237,85,101,1)";
                    monthlyTargetsChart.datasets[0].bars[i].pointStrokeColor = "#fff";
                    monthlyTargetsChart.datasets[0].bars[i].pointHighlightFill = "#fff";
                    monthlyTargetsChart.datasets[0].bars[i].pointHighlightStroke = "rgba(237,85,101,1)";
                    monthlyTargetsChart.datasets[0].bars[i].highlightFill = "rgba(237,85,101,0.5)";
                    monthlyTargetsChart.datasets[0].bars[i].highlightStroke = "rgba(237,85,101,0.7)",
                    shouldChange = true;
                }
            });
            if (shouldChange) {
                monthlyTargetsChart.update();
            }
        }).on('hidden.bs.tab', function(e) {
        	monthlyTargetsChart.destroy();
        });
    }, 300);
});
