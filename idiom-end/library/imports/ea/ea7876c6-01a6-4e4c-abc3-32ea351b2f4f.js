"use strict";
cc._RF.push(module, 'ea787bGAaZOTKvDMuo1Gy9P', 'explain');
// script/game/explain.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {
        this._registerClickEvent();
    },
    _registerClickEvent: function _registerClickEvent() {
        console.log(this.node.children.length);
        for (var i = 0; i < this.node.children.length; i++) {
            var item = this.node.children[i];
            item.on('touchstart', this._onTouchStart, this);
        }
    },
    _onTouchStart: function _onTouchStart(event) {
        var target = event.target;
        var label = target.getChildByName('New Label').getComponent(cc.Label);
        var bg = target.getChildByName('New Sprite').getComponent(cc.Sprite);
        var key = label.string;
        var gameModel = require("GameModel");
        gameModel.input(key);
    }
}
// update (dt) {},

);

cc._RF.pop();