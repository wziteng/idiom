"use strict";
cc._RF.push(module, '79233VWOgBKlrTZqOp5fT1e', 'Tanchuang');
// script/Common/Tanchuang.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    show: function show() {
        this.node.active = true;
        this.node.emit("fade-in");
    },
    hide: function hide() {
        // this.node.active = false ;
        this.node.emit("fade-out");
    }
}

// update (dt) {},
);

cc._RF.pop();