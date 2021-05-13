function setStatus500(ctx) {
	ctx.status = 500;
	ctx.body = { message: 'Internal server error!' };
}

module.exports = {
	setStatus500,
};
