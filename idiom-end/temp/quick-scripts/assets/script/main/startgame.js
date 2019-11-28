(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/main/startgame.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '547712QvMlOboo6pPywNSL9', 'startgame', __filename);
// script/main/startgame.js

'use strict';

var golbal = require('Global');
cc.Class({
    extends: cc.Component,

    properties: {
        progressBar: {
            type: cc.Node,
            default: null
        },
        is_loading: false

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var self = this;
        this.pro = this.progressBar.getComponent(cc.ProgressBar);
        this.pro.progress = 0;
        this.Over();
        this.ProBar();
        this.beginGame();
    },
    ProBar: function ProBar() {
        var self = this;
        this.node.on('probar', function () {
            self.schedule(self.callback, 0.7);
        });
    },
    callback: function callback() {
        var self = this;
        if (self.pro.progress < 1) {
            self.pro.progress = self.pro.progress + 0.1;
        } else {
            self.unschedule(self.callback);
        }
    },
    Over: function Over() {
        this.node.on('over', function () {
            cc.director.loadScene('main');
        });
    },
    getAuth: function getAuth() {
        var self = this;
        window.wx.login({
            success: function success(res) {
                var code = res.code;
                golbal.sendCodePost(code, function () {
                    window.wx.getUserInfo({
                        success: function success(res) {
                            console.log(res);
                            golbal.sendUserInfo(res, golbal.openid); //res:用户信息，openid：用户的openid
                            cc.director.preloadScene('main', function () {
                                console.log('加载完成！');
                                self.node.emit('over');
                            });
                        }
                    });
                });
            }
        });
    },
    beginGame: function beginGame() {
        var self = this;
        var sysInfo = window.wx.getSystemInfoSync();
        //获取微信界面大小
        var width = sysInfo.screenWidth;
        var height = sysInfo.screenHeight;
        window.wx.getSetting({
            success: function success(res) {
                console.log(res.authSetting);
                if (res.authSetting["scope.userInfo"]) {
                    self.node.emit('probar');
                    self.getAuth();
                } else {
                    var button = window.wx.createUserInfoButton({
                        type: 'text',
                        text: '',
                        style: {
                            left: 0,
                            top: 0,
                            width: width,
                            height: height,
                            backgroundColor: '#00000000', //最后两位为透明度
                            color: '#ffffff',
                            fontSize: 20,
                            textAlign: "center",
                            lineHeight: height
                        }
                    });
                    button.onTap(function (res) {
                        if (res.userInfo) {
                            console.log('授权');
                            self.node.emit('probar');
                            self.getAuth();
                            button.destroy();
                        } else {
                            console.log("用户拒绝授权:", res);
                        }
                    });
                }
            }
        });
    }
}

//update (dt) { },
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
        //# sourceMappingURL=startgame.js.map
        