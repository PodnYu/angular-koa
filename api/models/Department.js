const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			maxLength: 64,
			require: true,
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

module.exports = mongoose.model('Department', departmentSchema);
