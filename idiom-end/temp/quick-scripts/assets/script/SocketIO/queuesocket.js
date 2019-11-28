(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/SocketIO/queuesocket.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'db7e2Lqq2JOyJZn/vOCxysB', 'queuesocket', __filename);
// script/SocketIO/queuesocket.js

'use strict';

var global = require('Global');
var sdk = require('sdk');
var Constants = require('Constants');
var STAND = Constants.STAND;
cc.Class({
    extends: cc.Component,
    properties: {
        user_1_avatar: cc.Sprite,
        user_1_nickname: cc.Label,
        user_2_avatar: cc.Sprite,
        user_2_nickname: cc.Label
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {
        var self = this;

        console.log('玩家头像' + global.nickName);
        console.log('玩家昵称' + global.avatar);
        global.queueSocket = io.connect('wss://game.i--j.com:3002/queue', { 'force new connection': true }); //wss://game.i--j.com:3002

        global.queueSocket.on('set stand', function (stand) {
            if (stand === 'black') {
                //玩家一
                global.stand = STAND.BLACK;
                self.showUserINfo(self.user_1_avatar, global.avatar, self.user_1_nickname, global.nickName); //显示玩家自己的头像信息
            } else if (stand === 'white') {
                //玩家二
                global.stand = STAND.WHITE;
                self.showUserINfo(self.user_2_avatar, global.avatar, self.user_2_nickname, global.nickName); //显示玩家自己的头像信息
            }
        });

        //匹配成功进入房间
        global.queueSocket.on('match success', function (roomId) {
            cc.log('match success' + roomId);
            cc.log('我是' + global.stand);
            global.roomSocket = io.connect('wss://game.i--j.com:3002/rooms' + roomId, { 'force new connection': true });
            global.queueSocket.disconnect();
            global.roomSocket.emit('match_sss', global.nickName, global.avatar); //将玩家的昵称和头像发送给服务器global.nickName,global.avatar
            global.roomSocket.emit('type', 0);
            global.roomSocket.on('userAll', function (name1, avatar1, name2, avatar2) {
                console.log(global.stand);
                console.log(name1);
                console.log(name2);
                console.log(avatar1);
                console.log(avatar2);
                if (global.stand === 47) {
                    //玩家一
                    console.log('玩家一');
                    self.showUserINfo(self.user_2_avatar, avatar1, self.user_2_nickname, name1);
                    self.load();
                } else {
                    //玩家二
                    console.log('玩家二');
                    self.showUserINfo(self.user_1_avatar, avatar2, self.user_1_nickname, name2);
                    self.load();
                }
            });
        });
    },
    load: function load() {
        var self = this;
        self.schedule(function () {
            global.sendHttpPost(function () {
                cc.director.loadScene("tiaozhan");
            });
        }, 1.5);
    },
    showUserINfo: function showUserINfo(sprite, avatarUrl, Label, nickName) {
        //用来远程加载用户的头像和昵称
        sdk.createImage(sprite, avatarUrl);
        Label.string = nickName;
    },
    closePrefab: function closePrefab() {
        global.queueSocket.disconnect();
        var prefab = global.prename;
        prefab.destroy();
        global.queueSocket.disconnect();
        global.globalSocket = io.connect('wss://game.i--j.com:3002');
        global.hallSocket = io.connect('wss://game.i--j.com:3002/hall', { 'force new connection': true });
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=queuesocket.js.map
        