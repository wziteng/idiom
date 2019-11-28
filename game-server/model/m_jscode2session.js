#!/usr/bin/node

var config = require('../config.js');
var querystring = require('querystring');
var request = require('request');

var m_jscode2session = new Object;

m_jscode2session.get = function(params, res){
    m_jscode2session.ret = {"rt":true,"msg":""};

    var getData = querystring.stringify({
        appid: config.wx.appid,
        secret: config.wx.secret,
        js_code: params.js_code,
        grant_type: 'authorization_code'
    });
    var url=config.wx.url+"?"+getData;
    var session_id="";
    request.get(url, function(err, req){
        if(!err && req.statusCode===200) {
            var json = JSON.parse(req.body);
            var openid = json.openid;
            var session_key = json.session_key;
            console.log('openid: '+openid);
            console.log('session_key: '+session_key);
            if(openid && session_key) {
                m_jscode2session.ret.openid = openid;
                m_jscode2session.ret.session_key = session_key;
                m_jscode2session.end(params, res);
            } else {
                m_jscode2session.ret.rt = false;
                m_jscode2session.ret.msg = 'code is invalid';
                m_jscode2session.end(params, res);
            }
        } else {
            console.log(err);
            m_jscode2session.ret.rt = false;
            m_jscode2session.ret.msg = err;
            m_jscode2session.end(params, res);
        }
    });
};


m_jscode2session.end = function(params, res){
    res.status(200).json(m_jscode2session.ret);
    return res;
};

module.exports = m_jscode2session;