/**
 * Created by wuhao on 2019/9/25.
 */
var schedule = require('node-schedule');

/*
var rule = new schedule.RecurrenceRule();
rule.second = 0;
var j = schedule.scheduleJob(rule, function(){

    var user_info = require('./model/m_user_info');
    var ret = user_info.times_reset();
    console.log(ret);
});
*/

var j1 = schedule.scheduleJob('0 0 0 * *', function(){
    var user_info = require('./model/m_user_info');
    var ret = user_info.times_reset();
    console.log(ret);
});
