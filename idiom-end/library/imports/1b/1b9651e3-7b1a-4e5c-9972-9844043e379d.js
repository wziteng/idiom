"use strict";
cc._RF.push(module, '1b965HjexpOXJlymEQEPjed', 'MainGame');
// script/main/MainGame.js

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
        var self = this;
        function onTouchDown(event) {
            this.stopAllActions();
            this.runAction(scaleDownAction);
            global.sendHttpPost(function () {
                cc.director.loadScene("game");
            });
        }
        this.node.on('touchstart', onTouchDown, this.node);
    },

    start: function start() {}
}
// update (dt) {},
);

cc._RF.pop();