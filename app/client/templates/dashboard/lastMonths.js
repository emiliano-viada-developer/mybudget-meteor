// Template: lastMonths

Template.lastMonths.helpers({
	'lastMonths': function() {
		var currentDate = Session.get('currentDate'),
			splitted = currentDate.split('-'),
			currentYear = splitted[2], currentMonth = parseInt(splitted[1]),
			prevMonth = (currentMonth == 1)? 12 : currentMonth-1,
			prevYear = (currentMonth == 1)? currentYear-1 : currentYear,
			prevMonthDate = currentDate.replace(currentMonth, prevMonth);

		return [
			{current: true, month: currentDate, label: oMonthLabels[currentMonth-1] + ' ' + currentYear},
			{current: false, month: prevMonthDate, label: oMonthLabels[prevMonth-1] + ' ' + prevYear}
		];
	}
});
