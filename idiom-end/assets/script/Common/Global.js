//用来存储从服务器拿来的数据
let querystring = require('querystring');
const Global = {
    globalSocket:null,
    hallSocket:null,
    queueSocket:null,
    roomSocket:null,
    gameManager:null,
    stand:'',
    prename:'',
    time:'',
    win:'你赢了',//赢家

    nickName:'',//用户昵称
    avatar:'',//用户头像
    name:'',

    JSONData: [],
    Duan_JSONData: [],
    checkpoint: 1,
    times: 3,
    openid:'',
    server_id:'',
    UserInfo: {},
    sendHttpPost(callback) {
        let self = this;
        let request = cc.loader.getXMLHttpRequest();
        let url = 'https://game.i--j.com/user/game';
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function () {
            if (request.readyState === 4 && (request.status >= 200 && request.status < 300)) {
                let response = request.responseText;
                response = JSON.parse(response);
                //console.log(response);
                let row = response.row;
                let direction = row.direction.split(/,/);
                let idiom = row.idiom.split(/,/);
                let hideword = row.hideword.split(/,/);
                let index = row.index.split(/,/);
                let pingyin = row.pingyin.split(/,/);
                let explain = row.explain.split(/,/);
                let chuchu = row.chuchu.split(/,/);
                for (let i = 0; i < direction.length; i++) {
                    let obj = {
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
                if (callback){
                    callback();
                }
            }
        };
        request.send('checkpoint=' + self.checkpoint);
    },

    sendHttpPost_duan(callback) {
        let self = this;
        let request = cc.loader.getXMLHttpRequest();
        let url = 'https://game.i--j.com/user/duan';
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function () {
            if (request.readyState === 4 && (request.status >= 200 && request.status < 300)) {
                let response = request.responseText;
                response = JSON.parse(response);
                console.log(response);
                let row = response.rows;
                for (let i = 0; i < row.length; i++) {
                    let words = row[i].words;
                    let index = row[i].index;
                    let answer = row[i].answer.split('|');
                    let rightIndex = row[i].right_index;
                    let explain = row[i].explain;
                    let obj = {
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
                if (callback){
                    callback();
                }
            }
        };
        request.send();
    },
    sendHttpPost_times(openid) {
        let self = this;
        let request = cc.loader.getXMLHttpRequest();
        let url = 'https://game.i--j.com/user/info';
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function () {
            if (request.readyState === 4 && (request.status >= 200 && request.status < 300)) {
                let response = request.responseText;
                response = JSON.parse(response);
                console.log("response  ::"+response);
                self.times = response.row.times;
                console.log('tttttttttt'+self.times);
            }
        };
        request.send('open_id='+openid);
    },
    sendHttpPost_save_times(openid,times) {
        let self = this;
        let request = cc.loader.getXMLHttpRequest();
        let url = 'https://game.i--j.com/user/times_save';
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function () {
            if (request.readyState === 4 && (request.status >= 200 && request.status < 300)) {

            }
        };
        request.send('open_id='+openid+'&times=' + times);
    },

    sendCodePost(code,callback) {
        let self = this;
        let request = cc.loader.getXMLHttpRequest();
        let url = 'https://game.i--j.com/api/jscode2session';
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function () {
            if (request.readyState === 4 && (request.status >= 200 && request.status < 300)) {
                let response = request.responseText;
                response = JSON.parse(response);
                console.log(response);
                let openid = response.openid;
                self.openid = openid;
                console.log(self.openid);
                if (callback){
                    callback();
                }
            }
        };
        request.send('js_code=' + code);
    },

    sendUserInfo(userData,openid) {
        let self = this;
        let request = cc.loader.getXMLHttpRequest();
        let url = 'https://game.i--j.com/user/save';
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function () {
            if (request.readyState === 4 && (request.status >= 200 && request.status < 300)) {

            }
        };
        this.nickName=userData.userInfo.nickName;
        this.avatar=userData.userInfo.avatarUrl;
        console.log('发送玩家信息'+this.nickName);
        let getData = querystring.stringify({
            open_id:openid,
            nick_name: userData.userInfo.nickName,
            avatar_url: userData.userInfo.avatarUrl,
            gender: userData.userInfo.gender,
            country: userData.userInfo.country,
            province: userData.userInfo.province,
            city: userData.userInfo.city,
        });


        console.log(getData);
        request.send(getData);
    }
};

module.exports = Global;