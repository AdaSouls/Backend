const express = require("express");
const assetRoute = require("./asset.route");
const walletRoute = require("./wallet.route");
const healthCheckRoute = require("./healthCheck.route");
const config = require("../../config/config");
const router = express.Router();

const defaultRoutes = [
  {
    path: "/healthCheck",
    route: healthCheckRoute,
  },
  {
    path: "/asset",
    route: assetRoute,
  },
  {
    path: "/wallet",
    route: walletRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env !== "production") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
