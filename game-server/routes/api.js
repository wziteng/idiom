var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.all('/jscode2session', function(req, res, next) {
  var params = {};

  if(req.body.js_code == undefined) {
    res.status(403).json({"rt":false,"msg":"Param Error"});
    res.end();
    return;
  } else {
    params.js_code = req.body.js_code;
  }

  var jscode2session = require('../model/m_jscode2session');
  jscode2session.get(params, res);
});

module.exports = router;
