var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
	facebookId: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	picture: {
		type: String,
		required: true
	},
	email: {
		type: String
	},
    height: {
        type: String
    },
    weight: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);
