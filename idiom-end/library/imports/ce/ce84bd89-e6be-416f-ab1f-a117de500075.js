"use strict";
cc._RF.push(module, 'ce84b2J5r5Bb6sfoRfeUAB1', 'Over_Control');
// script/duanan/Over_Control.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.on('Back', function () {
            cc.director.loadScene('main');
        });
    },
    Back: function Back(event, data) {
        this.node.emit('Back');
    },
    OK: function OK(event, data) {
        this.node.emit('Back');
    },
    start: function start() {}

    // update (dt) {},

});

cc._RF.pop();