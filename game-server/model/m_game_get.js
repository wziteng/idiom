#!/usr/bin/node

var mysql = require('mysql');
var config = require('../config.js');

var m_game_get = new Object;
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

m_game_get.get = function(params, res){
    m_game_get.ret = {"rt":true,"msg":""};

    var sql = "select * from game where checkpoint = ? ";
    var sql_param = [ params.checkpoint ];

    query(sql, sql_param, function(err, result){
        if(err) {
            console.log('err :');
            console.log(err);
            m_game_get.ret.rt = false;
            if(err.code == undefined) m_game_get.ret.msg = err;
            else m_game_get.ret.msg = err.code;
            m_game_get.end(params, res);
        } else {
            if(result.length > 0) {
                m_game_get.ret.row = result[0];
                m_game_get.end(params, res);
            } else {
                m_game_get.ret.rt = false;
                m_game_get.ret.msg = '记录不存在';
                m_game_get.end(params, res);
            }
        }
    });
};


m_game_get.end = function(params, res){
    res.status(200).json(m_game_get.ret);
    return res;
};

module.exports = m_game_get;