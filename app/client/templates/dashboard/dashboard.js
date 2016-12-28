// Template: dashboard

// onRendered
Template.dashboard.onRendered(function() {
    scrollToHash(500);
});

// Helpers
Template.dashboard.helpers({
    categories: function() {
        return Categories.find({}, {sort: {name: 1}});
    },
    categoriesAmount: function() {
        return Categories.find({}).count();
    },
    from: function() {
        let from_string = '';

        firstEntry = Entries.findOne({}, {sort: {date: 1}, limit: 1});
        if (firstEntry) {
            firstEntryDate = new Date(firstEntry.date);

            from_string = dayLabels[firstEntryDate.getDay()] + ', ' + firstEntryDate.getDate() +
            ' de ' + oMonthLabels[firstEntryDate.getMonth()] + ' de ' + firstEntryDate.getFullYear();
        }

        return from_string;
    },
    to: function() {
        let to_string = '';

        lastEntry = Entries.findOne({}, {sort: {date: -1}, limit: 1});
        if (lastEntry) {
            lastEntryDate = new Date(lastEntry.date);

            to_string = dayLabels[lastEntryDate.getDay()] + ', ' + lastEntryDate.getDate() +
            ' de ' + oMonthLabels[lastEntryDate.getMonth()] + ' de ' + lastEntryDate.getFullYear();
        }

        return to_string;
    },
    getBalance: function() {
        var ae = Session.get('addedEntryCtr'); // Reactive variable session to turn this helper reactive

        return ReactiveMethod.call('getBalance', null, null, ae);
    }
});

// Events
Template.dashboard.events({
    'click .add-category-link': function(e) {
        categories = Categories.find({}).fetch();
        Session.set('modal', {
            title: 'Agregar categoria',
            icon: 'fa-plus-square-o',
            body: 'addCategory',
            data: categories,
            saveBtn: {label: 'Agregar'},
            closeBtn: {label: 'Cerrar'}
        });
    },
});
