const mongoose = require('mongoose');

function connectDB() {
	mongoose.connect(
		process.env.MONGODB_CONNECTION,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		(err) => {
			if (err) {
				console.error(err.message);
				console.error('MongoDB is not connected!');
				throw err;
			} else {
				console.log('MongoDB connected...');
			}
		}
	);
}

module.exports = connectDB;
