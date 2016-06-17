// Template: monthlyTargetsChart

Template.monthlyTargetsChart.onRendered(function() {
	// monthly targets chart
    var monthlyTargetsData = {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        datasets: [
            {
                label: "Example dataset",
                fillColor: "rgba(26,179,148,0.5)",
                strokeColor: "rgba(26,179,148,0.7)",
                pointColor: "rgba(26,179,148,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(26,179,148,1)",
                data: [48, 48, -60, 39, 56, -37, -30, 60, 39, 56, -37, 30]
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
});
