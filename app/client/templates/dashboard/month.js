// Template: month

// Helpers
var getFromTo = function(month) {
	var splitted = month.split('-'),
		date = new Date(splitted[1] + '-' + splitted[0] + '-' + splitted[2]), year = date.getFullYear(),
		month = parseInt(date.getMonth())+1,
		from = month + '-1-' + year,
		to = month + '-' + new Date(year, month, 0).getDate() + '-' + year;

	return {from: from, to: to};
};
var getPerc = function(type, current) {
	var percentage = 0;

	if (current) {
		percentage = (Session.get('prev' + type) > 0)?
			Math.round(((Session.get('current' + type) / Session.get('prev' + type)) * 100)) : 100;
	} else {

	}

	return percentage;
};
var operators = {
    'Income': function(a, b) { return a >= b },
    'Outcome': function(a, b) { return a < b },
};
var getTextClass = function(type, current) {
	var textClass = '';

	if (current) {
		textClass = (operators[type](Session.get('current' + type), Session.get('prev' + type)))? 'text-navy' : 'text-danger';
	} else {
		
	}

	return textClass;
};
var getIconClass = function(type, current) {
	var iconClass = 'fa-arrows-h';

	if (current) {
		iconClass = (Session.get('current' + type) >= Session.get('prev' + type))? 'fa-level-up' : 'fa-level-down';
	} else {
		
	}

	return iconClass;
};
Template.month.helpers({
	'currentLabel': function() {
		return (this.current)? 'Actual' : 'Anterior';
	},
	'currentClass': function() {
		return (this.current)? 'label-primary' : 'label-success';
	},
	'incomes': function() {
		var fromTo = getFromTo(this.month), from = fromTo.from, to = fromTo.to,
			mm = (this.current)? 'current' : 'prev' ;

		Session.set(mm + 'Income', ReactiveMethod.call('getHaber', from, to));
		return Session.get(mm + 'Income');
	},
	'outcomes': function() {
		var fromTo = getFromTo(this.month), from = fromTo.from, to = fromTo.to,
			mm = (this.current)? 'current' : 'prev' ;

		Session.set(mm + 'Outcome', ReactiveMethod.call('getDebe', from, to));
		return Session.get(mm + 'Outcome');
	},
	'inPerc': function() {
		return getPerc('Income', this.current);
	},
	'outPerc': function() {
		return getPerc('Outcome', this.current);
	},
	'inTextClass': function() {
		return getTextClass('Income', this.current);
	},
	'outTextClass': function() {
		return getTextClass('Outcome', this.current);
	},
	'inIconClass': function() {
		return getIconClass('Income', this.current);
	},
	'outIconClass': function() {
		return getIconClass('Outcome', this.current);
	}
});
