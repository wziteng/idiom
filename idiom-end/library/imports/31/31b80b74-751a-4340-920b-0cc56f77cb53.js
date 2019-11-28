"use strict";
cc._RF.push(module, '31b80t0dRpDQJILDMVvd8tT', 'Global');
// script/Common/Global.js

'use strict';

//用来存储从服务器拿来的数据
var querystring = require('querystring');
var Global = {
    globalSocket: null,
    hallSocket: null,
    queueSocket: null,
    roomSocket: null,
    gameManager: null,
    stand: '',
    prename: '',
    time: '',
    win: '你赢了', //赢家

    nickName: '', //用户昵称
    avatar: '', //用户头像
    name: '',

    JSONData: [],
    Duan_JSONData: [],
    checkpoint: 1,
    times: 3,
    openid: '',
    server_id: '',
    UserInfo: {},
    sendHttpPost: function sendHttpPost(callback) {
        var self = this;
        var request = cc.loader.getXMLHttpRequest();
        var url = 'https://game.i--j.com/user/game';
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status >= 200 && request.status < 300) {
                var response = request.responseText;
                response = JSON.parse(response);
                //console.log(response);
                var row = response.row;
                var direction = row.direction.split(/,/);
                var idiom = row.idiom.split(/,/);
                var hideword = row.hideword.split(/,/);
                var index = row.index.split(/,/);
                var pingyin = row.pingyin.split(/,/);
                var explain = row.explain.split(/,/);
                var chuchu = row.chuchu.split(/,/);
                for (var i = 0; i < direction.length; i++) {
                    var obj = {
                        id: i,
                        direction: parseInt(direction[i]),
                        idiom: idiom[i],
                        hideword: hideword[i],
                        index: parseInt(index[i]),
                        pingyin: pingyin[i],
                        chuchu: chuchu[i],
                        explain: explain[i]
                    };
                    self.JSONData.push(obj);
                }
                if (callback) {
                    callback();
                }
            }
        };
        request.send('checkpoint=' + self.checkpoint);
    },
    sendHttpPost_duan: function sendHttpPost_duan(callback) {
        var self = this;
        var request = cc.loader.getXMLHttpRequest();
        var url = 'https://game.i--j.com/user/duan';
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status >= 200 && request.status < 300) {
                var response = request.responseText;
                response = JSON.parse(response);
                console.log(response);
                var row = response.rows;
                for (var i = 0; i < row.length; i++) {
                    var words = row[i].words;
                    var index = row[i].index;
                    var answer = row[i].answer.split('|');
                    var rightIndex = row[i].right_index;
                    var explain = row[i].explain;
                    var obj = {
                        id: i,
                        words: words,
                        index: parseInt(index),
                        answer: answer,
                        RightIndex: parseInt(rightIndex),
                        explain: explain
                    };
                    self.Duan_JSONData.push(obj);
                }
                console.log(self.Duan_JSONData);
                if (callback) {
                    callback();
                }
            }
        };
        request.send();
    },
    sendHttpPost_times: function sendHttpPost_times(openid) {
        var self = this;
        var request = cc.loader.getXMLHttpRequest();
        var url = 'https://game.i--j.com/user/info';
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status >= 200 && request.status < 300) {
                var response = request.responseText;
                response = JSON.parse(response);
                console.log("response  ::" + response);
                self.times = response.row.times;
                console.log('tttttttttt' + self.times);
            }
        };
        request.send('open_id=' + openid);
    },
    sendHttpPost_save_times: function sendHttpPost_save_times(openid, times) {
        var self = this;
        var request = cc.loader.getXMLHttpRequest();
        var url = 'https://game.i--j.com/user/times_save';
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status >= 200 && request.status < 300) {}
        };
        request.send('open_id=' + openid + '&times=' + times);
    },
    sendCodePost: function sendCodePost(code, callback) {
        var self = this;
        var request = cc.loader.getXMLHttpRequest();
        var url = 'https://game.i--j.com/api/jscode2session';
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status >= 200 && request.status < 300) {
                var response = request.responseText;
                response = JSON.parse(response);
                console.log(response);
                var openid = response.openid;
                self.openid = openid;
                console.log(self.openid);
                if (callback) {
                    callback();
                }
            }
        };
        request.send('js_code=' + code);
    },
    sendUserInfo: function sendUserInfo(userData, openid) {
        var self = this;
        var request = cc.loader.getXMLHttpRequest();
        var url = 'https://game.i--j.com/user/save';
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status >= 200 && request.status < 300) {}
        };
        this.nickName = userData.userInfo.nickName;
        this.avatar = userData.userInfo.avatarUrl;
        console.log('发送玩家信息' + this.nickName);
        var getData = querystring.stringify({
            open_id: openid,
            nick_name: userData.userInfo.nickName,
            avatar_url: userData.userInfo.avatarUrl,
            gender: userData.userInfo.gender,
            country: userData.userInfo.country,
            province: userData.userInfo.province,
            city: userData.userInfo.city
        });

        console.log(getData);
        request.send(getData);
    }
};

module.exports = Global;

cc._RF.pop();