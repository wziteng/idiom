"use strict";
cc._RF.push(module, 'c6d74OAJ79KG4fxIRTFyE2v', 'duanan');
// script/main/duanan.js

'use strict';

var global = require('Global');
cc.Class({
    extends: cc.Component,

    properties: {
        pressedScaler: 1.2,
        transDuration: 0.1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var scaleDownAction = cc.scaleTo(0.1, 0.8);
        function onTouchDown(event) {
            this.stopAllActions();
            this.runAction(scaleDownAction);
            global.sendHttpPost_times(global.openid);
            global.sendHttpPost_duan(function () {
                cc.director.loadScene("every_duan"); //切换场景
            });
        }

        this.node.on('touchstart', onTouchDown, this.node);
    },

    start: function start() {}
}
// update (dt) {},
);

cc._RF.pop();