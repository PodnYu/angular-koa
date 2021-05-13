function getObjectIdRegExp() {
	return /^[0-9a-fA-F]{24}$/;
}

function isObjectIdValid(id) {
	if (!(typeof id === 'string')) return false;
	if (!id.match(getObjectIdRegExp())) return false;
	return true;
}

module.exports = {
	getObjectIdRegExp,
	isObjectIdValid,
};
