var express = require('express');
var router = express.Router();

router.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

/* GET user listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.all('/info', function(req, res, next) {
  var params = {};

  if(req.body.open_id == undefined) {
    res.status(403).json({"rt":false,"msg":"Param Error"});
    res.end();
    return;
  } else {
    params.open_id = req.body.open_id;
  }

  var user_info = require('../model/m_user_info');
  user_info.get(params, res);
});

router.all('/game', function(req, res, next) {
  var params = {};

  if(req.body.checkpoint == undefined) {
    res.status(403).json({"rt":false,"msg":"Param Error"});
    res.end();
    return;
  } else {
    params.checkpoint = req.body.checkpoint;
  }

  var game_get = require('../model/m_game_get');
  game_get.get(params, res);
});

router.all('/duan', function(req, res, next) {
  var params = {};

  //if(req.body.name == undefined) {
   // res.status(403).json({"rt":false,"msg":"Param Error"});
  //  res.end();
  //  return;
 // } else {
   // params.name = req.body.name;
//  }

  var duan_get = require('../model/m_duan_get');
  duan_get.get(params, res);
});

router.all('/save', function(req, res, next) {
  var params = {};

  if(req.body.open_id == undefined) {
    res.status(403).json({"rt":false,"msg":"Param Error open_id"});
    res.end();
    return;
  } else {
    params.open_id = req.body.open_id;
  }

  if(req.body.union_id == undefined) {
    params.union_id = null;
  } else {
    params.union_id = req.body.union_id;
  }

  if(req.body.nick_name == undefined) {
    res.status(403).json({"rt":false,"msg":"Param Error nick_name"});
    res.end();
    return;
  } else {
    params.nick_name = req.body.nick_name;
  }

  if(req.body.avatar_url == undefined) {
    res.status(403).json({"rt":false,"msg":"Param Error avatar_url"});
    res.end();
    return;
  } else {
    params.avatar_url = req.body.avatar_url;
  }

  if(req.body.gender == undefined) {
    res.status(403).json({"rt":false,"msg":"Param Error gender"});
    res.end();
    return;
  } else {
    params.gender = req.body.gender;
  }

  if(req.body.country == undefined) {
    res.status(403).json({"rt":false,"msg":"Param Error country"});
    res.end();
    return;
  } else {
    params.country = req.body.country;
  }

  if(req.body.province == undefined) {
    res.status(403).json({"rt":false,"msg":"Param Error province"});
    res.end();
    return;
  } else {
    params.province = req.body.province;
  }

  if(req.body.city == undefined) {
    res.status(403).json({"rt":false,"msg":"Param Error city"});
    res.end();
    return;
  } else {
    params.city = req.body.city;
  }

  var user_info = require('../model/m_user_info');
  user_info.save(params, res);
});

router.all('/level_save', function(req, res, next) {
  var params = {};

  if(req.body.open_id == undefined) {
    res.status(403).json({"rt":false,"msg":"Param Error"});
    res.end();
    return;
  } else {
    params.open_id = req.body.open_id;
  }

  if(req.body.level == undefined) {
    res.status(403).json({"rt":false,"msg":"Param Error"});
    res.end();
    return;
  } else {
    params.level = req.body.level;
  }

  var user_info = require('../model/m_user_info');
  user_info.set_level(params, res);
});

router.all('/times_save', function(req, res, next) {
  var params = {};

  if(req.body.open_id == undefined) {
    res.status(403).json({"rt":false,"msg":"Param Error"});
    res.end();
    return;
  } else {
    params.open_id = req.body.open_id;
  }

  if(req.body.times == undefined) {
    res.status(403).json({"rt":false,"msg":"Param Error"});
    res.end();
    return;
  } else {
    params.times = req.body.times;
  }

  var user_info = require('../model/m_user_info');
  user_info.set_times(params, res);
});


module.exports = router;
