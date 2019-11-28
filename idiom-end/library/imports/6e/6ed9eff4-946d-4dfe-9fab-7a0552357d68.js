"use strict";
cc._RF.push(module, '6ed9e/0lG1N/p+regVSNX1o', 'SettingButton');
// script/main/SettingButton.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {},
    show: function show() {
        this.node.active = true;
        this.node.emit("fade-in");
    },
    hide: function hide() {
        this.node.emit("fade-out");
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();