const express = require('express');
const router = express.Router();
const urlRoute = require('./url.route')

const defaultRoutes = [
  {
    path: '/',
    route: urlRoute,
  },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
  
module.exports = router;