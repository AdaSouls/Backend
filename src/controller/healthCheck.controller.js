const httpStatus = require('http-status');
const catchAsync = require('../util/catchAsync');
const codeService = require('../service/code.service');
const errorService = require('../service/error.service');
const Bugsnag = require('@bugsnag/js');


/**
 * Send a simple 'ok', with uptime and timestamp.
 */
const healthCheck = catchAsync(async (req, res) => {
  if (!codeService.checkCode(req, 'healthCheck')) {
    errorService.emitStashedError(res);
    return;
  }

  const healthcheck = {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  };

  res.status(httpStatus.OK).send(healthcheck);
});



module.exports = {
  healthCheck,
};
