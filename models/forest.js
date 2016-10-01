var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var forestSchema = Schema({
    forestId: {
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
	}
});

module.exports = mongoose.model('Forest', forestSchema);
