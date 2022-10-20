const pjson = require('../../../package.json');
const container = require('@n4l/container-utils');
let currentVersion = null;

reset = () => {
    currentVersion = null;
};

version = async(req, res) => {
    if (!currentVersion) {
        currentVersion = await container.determineVersion(pjson);
    }

    res.status(200);
    res.json(currentVersion);
};

module.exports = {
    version,
    reset
};