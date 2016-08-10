// Template: dashboard

// onRendered
Template.dashboard.onRendered(function() {
    scrollToHash(500);
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

