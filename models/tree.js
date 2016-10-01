var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var treeSchema = Schema({
    treeId: {
        type: String,
        required: true
    },
	forestId: {
		type: String,
		required: true
	},
	posX: {
		type: Number,
		required: true
	},
    posY: {
		type: Number,
		required: true
	},
    stage: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Tree', treeSchema);
