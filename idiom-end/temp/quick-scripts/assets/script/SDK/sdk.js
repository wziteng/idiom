(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/SDK/sdk.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '02483+A5+xILIPCou1ocy04', 'sdk', __filename);
// script/SDK/sdk.js

'use strict';

var sdk = {
    app_name: '',

    //.加载图片
    createImage: function createImage(sprite, url) {
        //.当前运行环境是小游戏，可以调用微信api接口wx.
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            var image = wx.createImage();
            image.onload = function () {
                var texture = new cc.Texture2D();
                texture.initWithElement(image);
                texture.handleLoadedTexture();
                sprite.spriteFrame = new cc.SpriteFrame(texture);
            };
            image.src = url;
        }
    },

    //msg参数: Object
    postMessage: function postMessage(msg) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.postMessage({ message: msg });
        }
    },
    onMessage: function onMessage(callback) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.onMessage(function (d) {
                // if(d.message == "common_back"){//.子域: 返回子域首页
                //     cc.director.loadScene("common_children")
                // }
                callback(d);
            });
        }
    },

    //.主域上报数据:    对用户托管数据进行写数据操作，允许同时写多组 KV 数据。
    setUserCloudStorage: function setUserCloudStorage(kvDataList, callback) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.setUserCloudStorage({
                KVDataList: kvDataList,
                success: function success(res) {
                    callback(res);
                },
                fail: function fail(res) {
                    callback(res);
                }
            });
        }
    },

    //.获取当前用户托管数据当中对应 key 的数据。该接口只可在开放数据域下使用
    getUserCloudStorage: function getUserCloudStorage(keyList, callback) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.getUserCloudStorage({
                keyList: keyList,
                success: function success(res) {
                    callback(res);
                },
                fail: function fail(res) {
                    callback(res);
                }
            });
        }
    },

    //.在小游戏是通过群分享卡片打开的情况下，可以通过调用该接口获取群同玩成员的游戏数据。该接口只可在开放数据域下使用。
    getGroupCloudStorage: function getGroupCloudStorage(shareTicket, keyList, callback) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.getGroupCloudStorage({
                shareTicket: shareTicket,
                keyList: keyList,
                success: function success(res) {
                    callback(res);
                },
                fail: function fail(res) {
                    callback(res);
                }
            });
        }
    },

    //.拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
    getFriendCloudStorage: function getFriendCloudStorage(keyList, callback) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.getFriendCloudStorage({
                keyList: keyList,
                success: function success(res) {
                    callback(res);
                },
                fail: function fail(res) {
                    callback(res);
                }
            });
        }
    }
};
module.exports = sdk;
window.sdk = sdk;

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
        //# sourceMappingURL=sdk.js.map
        