const mongoose = require('mongoose');

// YYYY-MM-DDTHH:mm:ss.sssZ

const employeeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		department: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'Department',
		},
		joinDate: {
			type: Date,
			default: Date.now,
		},
		photoFileName: {
			type: String,
			default: 'anonymous.png',
		},
	},
	{
		toJSON: {
			transform: function (doc, ret) {
				delete ret.__v;
				return ret;
			},
		},
	}
);

module.exports = mongoose.model('Employee', employeeSchema);
