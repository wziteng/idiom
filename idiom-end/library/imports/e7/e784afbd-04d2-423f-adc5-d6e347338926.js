"use strict";
cc._RF.push(module, 'e784a+9BNJCP63F1uNHM4km', 'tiaozhanOverButton');
// script/game/tiaozhanOverButton.js

'use strict';

var global = require('Global');
var Constants = require('Constants');
var STAND = Constants.STAND;
cc.Class({
    extends: cc.Component,

    properties: {
        rankTop: cc.Node
    },

    // onLoad () {},
    goHome: function goHome() {
        global.JSONData.splice(0, global.JSONData.length);
        global.win = '你赢了';
        global.roomSocket.disconnect();
        cc.director.loadScene("main"); //切换场景
    },
    Rank: function Rank() {
        this.rankTop.active = true;
        sdk.postMessage({ scene: 'showTop3' });
    },
    hide: function hide() {
        this.rankTop.active = false;
        sdk.postMessage({ scene: 'hide' });
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();