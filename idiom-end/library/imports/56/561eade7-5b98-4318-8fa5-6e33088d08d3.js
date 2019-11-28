"use strict";
cc._RF.push(module, '561ea3nW5hDGI+lbjMIjQjT', 'MainRank');
// script/main/MainRank.js

'use strict';

//参考文档：https://github.com/pandamicro/creator-docs/blob/next/zh/publish/publish-wechatgame-sub-domain.md
cc.Class({
    extends: cc.Component,

    properties: {
        Rank: cc.Node

    },

    // use this for initialization
    onLoad: function onLoad() {
        var pack_arr = ['duanan', 'game'];
        for (var i = 0; i < pack_arr.length; i++) {
            cc.loader.downloader.loadSubpackage(pack_arr[i], function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log('load successfully');
            });
        }
    },

    start: function start() {
        var self = this;
        //.主域上报数据,将数据托管到微信后台                             
        var kvDataList = new Array();
        kvDataList.push({ key: "nick", value: "nickName" });
        kvDataList.push({ key: "avatar", value: "" });
        kvDataList.push({ key: "score", value: "" + parseInt(Math.random() * 10000) }); //parseInt(Math.random()*1000)，必须是字符串
        sdk.setUserCloudStorage(kvDataList, function (res) {
            console.log('主域上报数据结果：', res);
            console.log("数据存储成功！");
        });
    },


    // called every frame
    update: function update(dt) {},

    //1.好友排行
    showRank: function showRank() {
        this.Rank.active = true;
        sdk.postMessage({ scene: 'showRank' }); //发送消息给子域
    },
    hideRank: function hideRank() {
        this.Rank.active = false;
        sdk.postMessage({ scene: 'hide' }); //发送消息给子域
    }
});

cc._RF.pop();