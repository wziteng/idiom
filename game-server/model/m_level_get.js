#!/usr/bin/node

var mysql = require('mysql');
var config = require('../config.js');

var m_level_get = new Object;
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

m_level_get.get = function(params, res){
    m_level_get.ret = {"rt":true,"msg":""};

    var sql = "select * from pre_org_chengyu where id = ? ";
    var sql_param = [ params.open_id ];

    query(sql, sql_param, function(err, result){
        if(err) {
            console.log('err :');
            console.log(err);
            m_level_get.ret.rt = false;
            if(err.code == undefined) m_level_get.ret.msg = err;
            else m_level_get.ret.msg = err.code;
            m_level_get.end(params, res);
        } else {
            if(result.length > 0) {
                m_level_get.ret.row = result[0];
                m_level_get.save_file(params, res);
            } else {
                m_level_get.ret.rt = false;
                m_level_get.ret.msg = '记录不存在';
                m_level_get.end(params, res);
            }
        }
    });
};

m_level_get.save_file = function(params, res) {

};

m_level_get.end = function(params, res){
    res.status(200).json(m_level_get.ret);
    return res;
};

module.exports = m_level_get;