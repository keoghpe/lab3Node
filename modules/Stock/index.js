var Stock = require('../../models/Stock.js');

exports = module.exports = {};

exports.getCurrentStock = getLatest;

exports.createNewMonth = function(year, month, callback, error){

	if (month === 12) {
		month = 1;
		year++;
	} else{
		month++;	
	}

	Stock.create({
		monthOf : new Date(year, month),
		LocksLeft : 70,
		StocksLeft : 80,
		BarrelsLeft : 60,
		done : false
	}, function(err, sales) {
		if (err)
			error(err);

		Stock.find(function(err, sales) {
			if (err)
				error(err);
			callback(sales);
		});
	});
};

/*exports.updateStock = function(TestLimits, callback, error){
	getLatest(function(stock) {
		stock[0] = new Stock(TestLimits);
		stock[0].save(function(err, stock, numAf){
			if (err) {
				error(err);
			}
			callback(stock);
		});
	}, error);
}*/

function getLatest(callback, error) {
	Stock.find().sort({monthOf: -1}).limit(1).exec(function(err, stock){
		if (err) {
			error(err);
		};
		callback(stock);
	});
};

exports.getStock = function (callback, error) {
	Stock.findOne().exec(function(err, stock) {
		if (err) {
			error(err);
		};
		callback(stock);
	});
};

exports.resetStockValues = function(callback, error) {
	var today = new Date();
	var conditions = {}
	  , update = { monthOf : today,
		LocksLeft : 70,
		StocksLeft : 80,
		BarrelsLeft : 90}
	  , options = { multi: true };

	Stock.update(conditions, update, options, callback);
};

exports.updateStock = function(TestLimits, callback, error) {

	var conditions = {}
	  , update = TestLimits
	  , options = { multi: true };

	Stock.update(conditions, update, options, callback);
};