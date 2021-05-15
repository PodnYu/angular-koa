const Koa = require('koa');
const KoaRouter = require('koa-router');
const koaCors = require('@koa/cors');
const koaBody = require('koa-body');
const serve = require('koa-static');
const mount = require('koa-mount');
require('dotenv').config();
const connectDB = require('./connectDB');
const createDepartmentRoutes = require('./api/routes/departments');
const createEmployeeRoutes = require('./api/routes/employees');

const PORT = process.env.PORT || 5007;

connectDB();

const app = new Koa();
const router = new KoaRouter();

createDepartmentRoutes(router);
createEmployeeRoutes(router);

app.use(koaCors());

app.use(
	mount(
		'/employeesAvatars',
		serve(__dirname + '/employeesAvatars', {
			index: 'anonymous.jpg',
		})
	)
);

app.use(
	koaBody({
		multipart: true,
		formidable: {
			uploadDir: './uploads',
			keepExtensions: true,
		},
	})
);
// app.use(koaBodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
	console.log(`listening on 127.0.0.1:${PORT}...`);
});
