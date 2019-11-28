#!/usr/bin/node

var mysql = require('mysql');
var config = require('../config.js');

var m_user_info = new Object;
const pool = mysql.createPool(config.DB.game);
var query=function(sql, sql_param, callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql, sql_param, function(qerr,vals,fields){
                conn.release();
                callback(qerr,vals,fields);
            });
        }
    });
};

m_user_info.get = function(params, res){
    m_user_info.ret = {"rt":true,"msg":""};

    var sql = "select * from user where open_id = ? ";
    var sql_param = [ params.open_id ];

    query(sql, sql_param, function(err, result){
        if(err) {
            console.log('err :');
            console.log(err);
            m_user_info.ret.rt = false;
            if(err.code == undefined) m_user_info.ret.msg = err;
            else m_user_info.ret.msg = err.code;
            m_user_info.end(params, res);
        } else {
            if(result.length > 0) {
                m_user_info.ret.row = result[0];
                m_user_info.end(params, res);
            } else {
                m_user_info.ret.rt = false;
                m_user_info.ret.msg = '记录不存在';
                m_user_info.end(params, res);
            }
        }
    });
};

m_user_info.save = function(params, res){
    m_user_info.ret = {"rt":true,"msg":""};

    var sql = "select * from user where open_id = ? ";
    var sql_param = [ params.open_id ];

    query(sql, sql_param, function(err, result){
        if(err) {
            console.log('err :');
            console.log(err);
            m_user_info.ret.rt = false;
            if(err.code == undefined) m_user_info.ret.msg = err;
            else m_user_info.ret.msg = err.code;
            m_user_info.end(params, res);
        } else {
            if(result.length > 0) {
                m_user_info.set(params, res);
            } else {
                m_user_info.add(params, res);
            }
        }
    });
};

m_user_info.set = function(params, res){
    var sql = "update `user` set union_id = ?, nick_name = ?, avatar_url = ?, gender = ?, country = ?, province = ?, city = ? where open_id = ? ";
    var sql_param = [ params.union_id, params.nick_name, params.avatar_url, params.gender, params.country, params.province, params.city, params.open_id ];

    query(sql, sql_param, function(err, result){
        if(err) {
            console.log('err1:');
            console.log(err);
            m_user_info.ret.rt = false;
            m_user_info.ret.msg = err;
        } else {
            //console.log('result:');
            //console.log(result);
            m_user_info.ret.result = result;
        }
        m_user_info.end(params, res);
    });
};

m_user_info.add = function(params, res){
    var sql = "insert into `user` (open_id, union_id, nick_name, avatar_url, gender, country, province, city)values(?, ?, ?, ?, ?, ?, ?, ?)";
    var sql_param = [ params.open_id, params.union_id, params.nick_name, params.avatar_url, params.gender, params.country, params.province, params.city];

    query(sql, sql_param, function(err, result){
        if(err) {
            console.log('err2:');
            console.log(err);
            m_user_info.ret.rt = false;
            if(err.code == undefined) m_user_info.ret.msg = err;
            else m_user_info.ret.msg = err.code;
            m_user_info.end(params, res);
        } else {
            if(result.insertId > 0) {
                m_user_info.ret.log_id = result.insertId;
            } else {
                m_user_info.ret.rt = false;
                m_user_info.ret.msg = '插入用户信息记录失败';
            }
            m_user_info.end(params, res);
        }
    });
};

m_user_info.set_level = function(params, res){
    m_user_info.ret = {"rt":true,"msg":""};

    var sql = "update `user` set `level` = ? where open_id = ? ";
    var sql_param = [ params.level, params.open_id ];

    query(sql, sql_param, function(err, result){
        if(err) {
            console.log('err3:');
            console.log(err);
            m_user_info.ret.rt = false;
            m_user_info.ret.msg = err;
        } else {
            //console.log('result:');
            //console.log(result);
            m_user_info.ret.result = result;
        }
        m_user_info.end(params, res);
    });
};

m_user_info.set_times = function(params, res){
    m_user_info.ret = {"rt":true,"msg":""};

    var sql = "update `user` set `times` = ? where open_id = ? ";
    var sql_param = [ params.times, params.open_id ];

    query(sql, sql_param, function(err, result){
        if(err) {
            console.log('err3:');
            console.log(err);
            m_user_info.ret.rt = false;
            m_user_info.ret.msg = err;
        } else {
            //console.log('result:');
            //console.log(result);
            m_user_info.ret.result = result;
        }
        m_user_info.end(params, res);
    });
};

m_user_info.times_reset = function(){
    m_user_info.ret = {"rt":true,"msg":""};

    var sql = "update `user` set `times` = 3 ";
    var sql_param = [];

    query(sql, sql_param, function(err, result){
        if(err) {
            console.log('err4:');
            console.log(err);
            m_user_info.ret.rt = false;
            m_user_info.ret.msg = err;
        } else {
            //console.log('result:');
            //console.log(result);
            m_user_info.ret.result = result;
        }
        return m_user_info.ret;
    });
};

m_user_info.end = function(params, res){
    res.status(200).json(m_user_info.ret);
    return res;
};

module.exports = m_user_info;