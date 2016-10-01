var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goalSchema = Schema({
    goalId: {
        type: String,
        required: true
    },
	facebookId: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
    days: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Goal', goalSchema);
