// Template: dashboard

// onRendered
Template.dashboard.onRendered(function(){

    var lineData = {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
        datasets: [
            {
                label: "Example dataset",
                fillColor: "rgba(26,179,148,0.5)",
                strokeColor: "rgba(26,179,148,0.7)",
                pointColor: "rgba(26,179,148,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(26,179,148,1)",
                data: [48, 48, 60, 39, 56, 37, 30]
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

});

// Helpers
Template.dashboard.helpers({
    categories: function() {
        return Categories.find({});
    },
    from: function() {
        firstEntry = Entries.findOne({}, {sort: {date: 1}, limit: 1});
        firstEntryDate = new Date(firstEntry.date);

        return dayLabels[firstEntryDate.getDay()] + ', ' + firstEntryDate.getDate() +
            ' de ' + oMonthLabels[firstEntryDate.getMonth()] + ' de ' + firstEntryDate.getFullYear();
    },
    to: function() {
        lastEntry = Entries.findOne({}, {sort: {date: -1}, limit: 1});
        lastEntryDate = new Date(lastEntry.date);

        return dayLabels[lastEntryDate.getDay()] + ', ' + lastEntryDate.getDate() +
            ' de ' + oMonthLabels[lastEntryDate.getMonth()] + ' de ' + lastEntryDate.getFullYear();
    },
    getBalance: function() {
        var ae = Session.get('addedEntryCtr'); // Reactive variable session to turn this helper reactive

        return ReactiveMethod.call('getBalance', null, null, ae);
    }
});

