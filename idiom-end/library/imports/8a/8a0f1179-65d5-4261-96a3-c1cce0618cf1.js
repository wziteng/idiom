"use strict";
cc._RF.push(module, '8a0f1F5ZdVCYZajwczgYYzx', 'EnerySlot');
// script/main/EnerySlot.js

"use strict";

var getRandomInt = function getRandomInt(min, max) {
    var ratio = Math.random();
    return min + Math.floor((max - min) * ratio);
};
cc.Class({
    extends: cc.Component,

    properties: {
        tubiaos: {
            default: [],
            type: cc.SpriteFrame
        },
        labels: {
            default: [],
            type: cc.String
        },
        tubiao: cc.Sprite,
        label: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.refresh();
    },
    refresh: function refresh() {
        // 图标
        var bgIndex = getRandomInt(0, this.tubiaos.length);
        this.tubiao.spriteFrame = this.tubiaos[bgIndex];
        //字数
        var labelIndex = getRandomInt(0, 4);
        this.label.string = this.labels[labelIndex];
    }
}

// update (dt) {},
);

cc._RF.pop();