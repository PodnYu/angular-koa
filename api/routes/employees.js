const Employee = require('../models/Employee');
const Department = require('../models/Department');
const { setStatus500 } = require('../utils/httpUtils');
const { isObjectIdValid } = require('../utils/mongoUtils');
const fs = require('fs');

function getEmployee(body) {
	return {
		name: body.name,
		departmentId: body.departmentId,
		joinDate: body.joinDate,
		photoFileName: body.photoFileName,
	};
}

function logEmployee(employee) {
	console.log(`\tname: ${employee.name}`);
	console.log(`\tdepartmentId: ${employee.departmentId}`);
	console.log(`\tjoinDate: ${employee.joinDate}`);
	console.log(`\tphotoFileName: ${employee.photoFileName}`);
}

function isEmployeeValid(ctx, { departmentId, joinDate }) {
	if (!isObjectIdValid(departmentId)) {
		ctx.status = 400;
		ctx.body = { message: 'No such department' };
		return false;
	}

	if (joinDate && isNaN(Date.parse(joinDate))) {
		ctx.status = 400;
		ctx.body = { message: 'Invalid date!' };
		return false;
	}

	return true;
}

module.exports = function (router) {
	router.get('/employees', async (ctx) => {
		console.log('GET /employees');
		try {
			const employees = await Employee.find({})
				.populate('department', 'name')
				.exec();

			ctx.status = 200;
			ctx.body = { employees };
		} catch (err) {
			console.error(err.message);
			setStatus500(ctx);
		}
	});

	router.get('/employees/:id', async (ctx) => {
		const employeeId = ctx.params.id;
		console.log('GET /employees/:id', employeeId);
		try {
			const employee = await Employee.find({ _id: employeeId })
				.populate('department', 'name')
				.exec();

			ctx.status = 200;
			ctx.body = { employee };
		} catch (err) {
			console.error(err.message);
			setStatus500(ctx);
		}
	});

	router.post('/employees', async (ctx) => {
		let { name, departmentId, joinDate, photoFileName } = ctx.request.body;
		console.log('POST /employees:');
		logEmployee(getEmployee(ctx.request.body));

		if (!isEmployeeValid(ctx, { departmentId, joinDate })) return;

		try {
			if (!(await Department.exists({ _id: departmentId }))) {
				ctx.status = 404;
				ctx.body = { message: "Department doesn't exists" };
				return;
			}

			const employee = await Employee.create({
				name,
				department: departmentId,
				joinDate,
				photoFileName,
			});
			ctx.status = 200;
			ctx.body = { _id: employee.id };
		} catch (err) {
			console.error(err.message);
			setStatus500(ctx);
		}
	});

	router.put('/employees/:id', async (ctx) => {
		const employeeId = ctx.params.id;
		let { name, departmentId, joinDate, photoFileName } = ctx.request.body;
		console.log('PUT /employees:', employeeId, name);
		logEmployee(getEmployee(ctx.request.body));

		if (!isEmployeeValid(ctx, { departmentId, joinDate })) return;

		try {
			if (!(await Employee.exists({ _id: employeeId }))) {
				ctx.status = 404;
				ctx.body = { message: 'Employee not found!' };
				return;
			}

			const updateResult = await Employee.updateOne(
				{ _id: employeeId },
				{ $set: { name, department: departmentId, joinDate, photoFileName } },
				{ omitUndefined: true }
			).exec();

			ctx.status = 200;
			ctx.body = { updated: updateResult.nModified === 1 };
		} catch (err) {
			console.error(err.message);
			setStatus500(ctx);
		}
	});

	router.delete('/employees/:id', async (ctx) => {
		const employeeId = ctx.params.id;
		console.log('DELETE /employees:', employeeId);
		try {
			if (!(await Employee.exists({ _id: employeeId }))) {
				ctx.status = 404;
				ctx.body = { message: 'Employee not found!' };
				return;
			}

			const deleteResult = await Employee.deleteOne({
				_id: employeeId,
			}).exec();

			ctx.status = 200;
			ctx.body = { deleted: deleteResult.deletedCount === 1 };
		} catch (err) {
			console.error(err.message);
			setStatus500(ctx);
		}
	});

	router.post('/employees/uploadAvatar', async (ctx) => {
		console.log('POST /employees/uploadAvatar');
		const { path, name } = ctx.request.files.avatar;

		if (name !== 'anonymous.jpg') {
			await new Promise((resolve, reject) => {
				fs.rename(path, `./employeesAvatars/${name}`, (err) => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			});
		}

		ctx.status = 200;
		ctx.body = { uploaded: true };
	});
};
