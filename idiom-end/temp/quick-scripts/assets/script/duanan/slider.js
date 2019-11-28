(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/duanan/slider.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f47ban/F9ZA7a1dRN4a/QnZ', 'slider', __filename);
// script/duanan/slider.js

'use strict';

var global = require('Global');
var slider = cc.Class({
    extends: cc.Component,

    properties: {
        progress: {
            default: null,
            type: cc.Sprite
        },

        bt: {
            default: null,
            type: cc.Node
        },

        _width: 0,

        countTime: {
            type: cc.Label,
            default: null
        },
        broadcostTimes: 120,
        tip_All: {
            type: cc.Node,
            default: null
        },
        GameOverPrefab: cc.Prefab

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.tip = cc.find('Canvas/tip/t2').getComponent(cc.Label);
        this.tip.string = global.times;
        var self = this;

        self.bt.on('click', function () {
            if (global.times === 0) {
                self.initGameOverPrefab();
            } else {
                this.schedule(this.doCountTime, 1); //每一秒中执行一次doCountTime()
                this.node.dispatchEvent(new cc.Event.EventCustom('start_game', true));
                self.tip_All.active = false;
            }
        }, this);
    },
    initGameOverPrefab: function initGameOverPrefab() {
        var item = cc.instantiate(this.GameOverPrefab);
        item.parent = cc.find('Canvas');
        item.setPosition(0, 0);
        this.node.addChild(item);
    },
    doCountTime: function doCountTime() {
        if (this.broadcostTimes <= '0') {
            this.node.dispatchEvent(new cc.Event.EventCustom('game_over', true));
            return;
        }
        this.broadcostTimes -= 1;
        this.countTime.string = this.broadcostTimes.toString() + " 秒";
        this.cuntDownTime(this.broadcostTimes);
    },
    cuntDownTime: function cuntDownTime(number) {
        if (number <= 0) {
            if (this.tip.string === '0') {
                console.log('明天再来！');
                this.unschedule(this.doCountTime); //取消定时器
                return;
            }
            this.tip.string -= 1;
        }
    },
    start: function start() {},
    update: function update(dt) {}
});

module.exports = slider;

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
        //# sourceMappingURL=slider.js.map
        