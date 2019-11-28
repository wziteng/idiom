"use strict";
cc._RF.push(module, '2e05eIRUN5BirRPWa5Qvz4U', 'PannelTrandition');
// script/Common/PannelTrandition.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        duration: 0.2
    },

    onLoad: function onLoad() {
        this.outOfWorld = cc.v2(5000, 0);
        this.node.position = this.outOfWorld;
        //处理动画效果,显示的时候
        var cbFadeOut = cc.callFunc(this.onFadeOutFinish(), this);
        var cbFadeIn = cc.callFunc(this.onFadeInFinish(), this);

        this.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(this.duration, 255), cc.scaleTo(this.duration, 1)), cbFadeIn);
        //关掉的时候
        // this.actionFadeOut=cc.sequence(
        //     cc.spawn(
        //         cc.fadeTo(this.duration,255),cc.scaleTo(this.duration,2),
        //     ),cbFadeOut
        // );
        this.node.on('fade-in', this.startFadeIn, this); //回调函数处理相对应事件
        this.node.on('fade-out', this.startFadeOut, this);
    },
    startFadeIn: function startFadeIn() {
        this.node.position = cc.v2(0, 0);
        // this.node.setScale(2); //两倍放大效果
        // this.node.opacity = 0;
        // this.node.runAction(this.actionFadeIn);
    },
    startFadeOut: function startFadeOut() {
        // this.node.pauseSystemEvents(true);
        // this.node.runAction(this.actionFadeOut);
        this.node.position = this.outOfWorld;
    },
    onFadeInFinish: function onFadeInFinish() {//动画结束代码，屏蔽事件
        // this.node.resumeSystemEvents(true);
    },

    //出去的效果
    onFadeOutFinish: function onFadeOutFinish() {
        this.node.position = this.outOfWorld;
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();