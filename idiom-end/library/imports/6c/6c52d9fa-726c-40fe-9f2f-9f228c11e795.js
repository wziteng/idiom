"use strict";
cc._RF.push(module, '6c52dn6cmxA/p8vnyKMEeeV', 'pop_success');
// script/duanan/pop_success.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        bt: {
            type: cc.Node,
            default: null
        },
        GameOverPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {
        this.bt.on('click', function () {
            console.log('点击！！！');
            this.initGameOverPrefab();
        }, this);
    },
    initGameOverPrefab: function initGameOverPrefab() {
        var item = cc.instantiate(this.GameOverPrefab);
        item.setPosition(0, 0);
        this.node.addChild(item);
    }

    // update (dt) {},

});

cc._RF.pop();