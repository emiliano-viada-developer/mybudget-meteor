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
	var percentage = 100, calc = false;

	if (current) {
		if (Session.get('current' + type) >= Session.get('prev' + type)) {
			var div1 = Session.get('current' + type),
				div2 = Session.get('prev' + type);
		} else if (Session.get('prev' + type) > Session.get('current' + type)) {
			var div1 = Session.get('prev' + type),
				div2 = Session.get('current' + type);
		}
		if (div2 > 0) {
			calc = true;
		}
	} else {
		if (Session.get('prev' + type) >= Session.get('prevPrev' + type)) {
			var div1 = Session.get('prev' + type),
				div2 = Session.get('prevPrev' + type);
		} else if (Session.get('prevPrev' + type) > Session.get('prev' + type)) {
			var div1 = Session.get('prevPrev' + type),
				div2 = Session.get('prev' + type);
		}
		if (div2 > 0) {
			calc = true;
		}
	}

	if (calc) {
		percentage = Math.round(((div1 / div2) * 100));
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
		textClass = (operators[type](Session.get('prev' + type), Session.get('prevPrev' + type)))? 'text-navy' : 'text-danger';
	}

	return textClass;
};
var getIconClass = function(type, current) {
	var iconClass = 'fa-arrows-h';

	if (current) {
		iconClass = (Session.get('current' + type) >= Session.get('prev' + type))? 'fa-level-up' : 'fa-level-down';
	} else {
		iconClass = (Session.get('prev' + type) >= Session.get('prevPrev' + type))? 'fa-level-up' : 'fa-level-down';
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

		if (!this.current) {
			var help = this.month.split('-'), mmm = parseInt(help[1]),
				newm = (mmm == 1)? 12 : mmm-1, ppm = this.month.replace(mmm, newm),
				fromTo2 = getFromTo(ppm), from2 = fromTo2.from, to2 = fromTo2.to;

			Session.set('prevPrevIncome', ReactiveMethod.call('getHaber', from2, to2));
		}

		return Session.get(mm + 'Income');
	},
	'outcomes': function() {
		var fromTo = getFromTo(this.month), from = fromTo.from, to = fromTo.to,
			mm = (this.current)? 'current' : 'prev' ;

		Session.set(mm + 'Outcome', ReactiveMethod.call('getDebe', from, to));

		if (!this.current) {
			var help = this.month.split('-'), mmm = parseInt(help[1]),
				newm = (mmm == 1)? 12 : mmm-1, ppm = this.month.replace(mmm, newm),
				fromTo2 = getFromTo(ppm), from2 = fromTo2.from, to2 = fromTo2.to;

			Session.set('prevPrevOutcome', ReactiveMethod.call('getDebe', from2, to2));
		}

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
