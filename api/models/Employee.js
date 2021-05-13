const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	department: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'Department',
	},
	dateOfJoining: {
		type: Date,
	},
	photoFileName: String,
});

module.exports = mongoose.model('Employee', employeeSchema);
