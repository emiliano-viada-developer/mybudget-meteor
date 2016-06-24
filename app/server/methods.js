// Methods
Meteor.methods({
	'addEntry': function(entry) {
		var currentUser = Meteor.userId();

		if (currentUser) {
			check(entry, {categoryId: String, date: Date, haber: Boolean, countable: Boolean, value: Number, comment: String});
			entry.ownerId = currentUser;
			entry.createdAt = new Date();
			entry.updatedAt = new Date();

			Entries.insert(entry);

		} else {
			throw new Meteor.Error("not-logged-in", "You're not logged-in.");
		}
	},
	'editEntry': function(entryId, entry) {
		var currentUser = Meteor.userId();

		if (currentUser) {
			check(entry, {categoryId: String, date: Date, haber: Boolean, countable: Boolean, value: Number, comment: String});
			entry.updatedAt = new Date();

			Entries.update({_id: entryId, ownerId: currentUser}, {$set: entry});

		} else {
			throw new Meteor.Error("not-logged-in", "You're not logged-in.");
		}
	},
	'removeEntry': function(entryId) {
		var currentUser = Meteor.userId();

		if (currentUser) {

			Entries.remove({_id: entryId, ownerId: currentUser});

		} else {
			throw new Meteor.Error("not-logged-in", "You're not logged-in.");
		}
	},
	'addCategory': function(category) {
		var currentUser = Meteor.userId();

		if (currentUser) {
			check(category, {parentId: String, name: String, description: String});
			category.ownerId = currentUser;
			category.createdAt = new Date();
			category.updatedAt = new Date();

			Categories.insert(category);

		} else {
			throw new Meteor.Error("not-logged-in", "You're not logged-in.");
		}
	},
	'editCategory': function(categoryId, category) {
		var currentUser = Meteor.userId();

		if (currentUser) {
			check(category, {parentId: String, name: String, description: String});
			category.updatedAt = new Date();

			Categories.update({_id: categoryId, ownerId: currentUser}, {$set: category});

		} else {
			throw new Meteor.Error("not-logged-in", "You're not logged-in.");
		}
	},
	'removeCategory': function(categoryId) {
		var currentUser = Meteor.userId();

		if (currentUser) {
			Categories.remove({ $or: [{_id: categoryId}, {parentId: categoryId}], ownerId: currentUser});
		} else {
			throw new Meteor.Error("not-logged-in", "You're not logged-in.");
		}
	},
	'addTarget': function(target) {
		var currentUser = Meteor.userId();

		if (currentUser) {
			check(target, {month: String, amount: Number, points: Number});
			target.ownerId = currentUser;
			target.createdAt = new Date();
			target.updatedAt = new Date();

			Targets.insert(target);

		} else {
			throw new Meteor.Error("not-logged-in", "You're not logged-in.");
		}
	},
	'editTarget': function(targetId, target) {
		var currentUser = Meteor.userId();

		if (currentUser) {
			check(target, {month: String, amount: Number, points: Number});
			target.updatedAt = new Date();

			Targets.update({_id: targetId, ownerId: currentUser}, {$set: target});

		} else {
			throw new Meteor.Error("not-logged-in", "You're not logged-in.");
		}
	},
	'removeTarget': function(targetId) {
		var currentUser = Meteor.userId();

		if (currentUser) {
			Targets.remove({_id: targetId, ownerId: currentUser});
		} else {
			throw new Meteor.Error("not-logged-in", "You're not logged-in.");
		}
	},
	'getBalance': function(from, to, react) {
		from = from || null;
		to = to || null;
		var haber = Meteor.call('getHaber', from, to),
			debe = Meteor.call('getDebe', from, to);

		return (haber - debe);
	},
	'getHaber': function(from, to) {
		from = from || null;
		to = to || null;
		return Meteor.call('getSum', true, from, to);
	},
	'getDebe': function(from, to) {
		from = from || null;
		to = to || null;
		return Meteor.call('getSum', false, from, to);
	},
	'getSum': function(haber, from, to) {
		var currentUser = Meteor.userId(),
			matchVar = {ownerId: currentUser, haber: haber, value: {$gt: 0}},
			pipeline, result;

		if (from != null && to != null) {
			matchVar.date = {
                $gte: new Date(moment(new Date(from)).format('YYYY-MM-DD') + ' 00:00:00.0000'),
                $lte: new Date(moment(new Date(to)).format('YYYY-MM-DD') + ' 23:59:59.9999')
            }
		} else if (from != null) {
			matchVar.date = {
                $gte: new Date(moment(new Date(from)).format('YYYY-MM-DD') + ' 00:00:00.0000')
            }
		} else if (to != null) {
			matchVar.date = {
                $lte: new Date(moment(new Date(to)).format('YYYY-MM-DD') + ' 23:59:59.9999')
            }
		}

		pipeline = [
            {$match: matchVar},
            {$group: {_id: "$owner", total : {$sum: "$value"}}}
        ];
		result = Entries.aggregate(pipeline);

        return (result.length)? result[0].total : 0;
	},
	'getMonthlyIncomes': function(from, to) {
		from = from || null;
		to = to || null;
		return Meteor.call('getMonthly', true, from, to);
	},
	'getMonthlyOutcomes': function(from, to) {
		from = from || null;
		to = to || null;
		return Meteor.call('getMonthly', false, from, to);
	},
	'getMonthly': function(haber, from, to) {
		var currentUser = Meteor.userId(),
			matchVar = {ownerId: currentUser, haber: haber, value: {$gt: 0}},
			pipeline, result;

		if (from != null && to != null) {
			matchVar.date = {
                $gte: new Date(moment(new Date(from)).format('YYYY-MM-DD') + ' 00:00:00.0000'),
                $lte: new Date(moment(new Date(to)).format('YYYY-MM-DD') + ' 23:59:59.9999')
            }
		} else if (from != null) {
			matchVar.date = {
                $gte: new Date(moment(new Date(from)).format('YYYY-MM-DD') + ' 00:00:00.0000')
            }
		} else if (to != null) {
			matchVar.date = {
                $lte: new Date(moment(new Date(to)).format('YYYY-MM-DD') + ' 23:59:59.9999')
            }
		}

		pipeline = [
            {$match: matchVar},
            {$group: {_id: { $substr: ["$date", 0, 7] }, total : {$sum: "$value"}}}
        ];
		result = Entries.aggregate(pipeline);

        return (result.length)? result : [];
	},
	'getTargets': function(from, to) {
		var criteria = {};

		if (from != null && to != null) {
			criteria.month = {
				$gte: moment(new Date(from)).format('YYYY-MM-DD'),
				$lte: moment(new Date(to)).format('YYYY-MM-DD')
			};
		} else if (from != null) {
			criteria.month = {$gte: moment(new Date(from)).format('YYYY-MM-DD')};
		} else if (to != null) {
			criteria.month = {$lte: moment(new Date(to)).format('YYYY-MM-DD')};
		}

		return Targets.find(criteria).fetch();
	},
	'getAverage': function(from, to, categoryId) {
		var matchVar = {value: {$gt: 0}}, pipeline, result;

		// Filter by category?
		if (categoryId) {
			matchVar.categoryId = categoryId;
		}

		if (from != null && to != null) {
			matchVar.date = {
                $gte: new Date(moment(new Date(from)).format('YYYY-MM-DD') + ' 00:00:00.0000'),
                $lte: new Date(moment(new Date(to)).format('YYYY-MM-DD') + ' 23:59:59.9999')
            }
		} else if (from != null) {
			matchVar.date = {
                $gte: new Date(moment(new Date(from)).format('YYYY-MM-DD') + ' 00:00:00.0000')
            }
		} else if (to != null) {
			matchVar.date = {
                $lte: new Date(moment(new Date(to)).format('YYYY-MM-DD') + ' 23:59:59.9999')
            }
		}

		pipeline = [
            {$match: matchVar},
            {$group: {_id: categoryId, average: {$avg: "$value"}}}
        ];
		result = Entries.aggregate(pipeline);

        return (result.length)? result[0].average : 0;
	},
	'getMonthlyBalances': function(from, to, categoryId) {
		var matchVar = {value: {$gt: 0}}, pipeline, result;

		// Filter by category?
		if (categoryId) {
			matchVar.categoryId = categoryId;
		}

		if (from != null && to != null) {
			matchVar.date = {
                $gte: new Date(moment(new Date(from)).format('YYYY-MM-DD') + ' 00:00:00.0000'),
                $lte: new Date(moment(new Date(to)).format('YYYY-MM-DD') + ' 23:59:59.9999')
            }
		} else if (from != null) {
			matchVar.date = {
                $gte: new Date(moment(new Date(from)).format('YYYY-MM-DD') + ' 00:00:00.0000')
            }
		} else if (to != null) {
			matchVar.date = {
                $lte: new Date(moment(new Date(to)).format('YYYY-MM-DD') + ' 23:59:59.9999')
            }
		}

		pipeline = [
            {$match: matchVar},
            {$group: {_id: { $substr: ["$date", 0, 7] }, total : {$sum: "$value"}}}
        ];
		result = Entries.aggregate(pipeline);

        return (result.length)? result : [];
	}
});
