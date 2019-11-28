"use strict";
cc._RF.push(module, '0eec2swZD1H2KrS5ikVaRGw', 'Tiaozhan');
// script/main/Tiaozhan.js

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
            // global.sendHttpPost(() => {
            //         cc.director.loadScene("tiaozhan");
            //         console.log('hahaahhaah');
            // });
        }
        this.node.on('touchstart', onTouchDown, this.node);
    },

    start: function start() {}
}
// update (dt) {},
);

cc._RF.pop();