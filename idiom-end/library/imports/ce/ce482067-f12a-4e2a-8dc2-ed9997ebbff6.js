"use strict";
cc._RF.push(module, 'ce482Bn8SpOKo3C7ZmX67/2', 'Renwu');
// script/main/Renwu.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        ren: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {
        this.ren.node.runAction(cc.repeatForever(cc.sequence(cc.rotateBy(1, 10), cc.rotateBy(1, -10), cc.rotateBy(1, -10), cc.rotateBy(1, 10))));
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();