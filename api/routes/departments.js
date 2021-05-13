const Department = require('../models/Department');
const { setStatus500 } = require('../utils/httpUtils');

module.exports = function (router) {
	router.get('/departments', async (ctx) => {
		console.log('GET /departments');
		try {
			const departments = await Department.find({}).exec();

			ctx.status = 200;
			ctx.body = { departments };
		} catch (err) {
			console.error(err.message);
			setStatus500(ctx);
		}
	});

	router.get('/departments/:id', async (ctx) => {
		const departmentId = ctx.params.id;
		console.log('GET /departments/:id', departmentId);
		try {
			const department = await Department.find({ _id: departmentId }).exec();

			ctx.status = 200;
			ctx.body = { department };
		} catch (err) {
			console.error(err.message);
			setStatus500(ctx);
		}
	});

	router.post('/departments', async (ctx) => {
		const { name } = ctx.request.body;
		console.log('POST /departments:', name);
		try {
			const department = await Department.create({ name });

			ctx.status = 200;
			ctx.body = { _id: department.id };
		} catch (err) {
			console.error(err.message);
			setStatus500(ctx);
		}
	});

	router.put('/departments/:id', async (ctx) => {
		const departmentId = ctx.params.id;
		const { name } = ctx.request.body;
		console.log('PUT /departments:', departmentId, name);
		try {
			if (!(await Department.exists({ _id: departmentId }))) {
				ctx.status = 404;
				ctx.body = { message: 'Department not found!' };
				return;
			}

			const updateResult = await Department.updateOne(
				{ _id: departmentId },
				{ $set: { name } },
				{ omitUndefined: true }
			).exec();

			ctx.status = 200;
			ctx.body = { updated: updateResult.nModified === 1 };
		} catch (err) {
			console.error(err.message);
			setStatus500(ctx);
		}
	});

	router.delete('/departments/:id', async (ctx) => {
		const departmentId = ctx.params.id;
		console.log('DELETE /departments:', departmentId);
		try {
			if (!(await Department.exists({ _id: departmentId }))) {
				ctx.status = 404;
				ctx.body = { message: 'Department not found!' };
				return;
			}

			const deleteResult = await Department.deleteOne({
				_id: departmentId,
			}).exec();

			ctx.status = 200;
			ctx.body = { deleted: deleteResult.deletedCount === 1 };
		} catch (err) {
			console.error(err.message);
			setStatus500(ctx);
		}
	});
};
