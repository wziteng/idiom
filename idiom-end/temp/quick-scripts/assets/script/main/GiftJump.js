(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/main/GiftJump.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f88ad9LxhxKxYfaF/ou2dV0', 'GiftJump', __filename);
// script/main/GiftJump.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        jingli: cc.Sprite,
        liwu: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.jumpLiwu();
        this.jumpJingli();
    },
    jumpJingli: function jumpJingli() {
        return this.jingli.node.runAction(cc.repeatForever(cc.sequence(cc.rotateBy(0.5, 30), cc.rotateBy(0.5, -30))));
    },
    jumpLiwu: function jumpLiwu() {
        return this.liwu.node.runAction(cc.repeatForever(cc.sequence(cc.moveTo(0.5, 0, 4), cc.moveTo(0.5, 0, 0))));
    },
    start: function start() {}
}

// update (dt) {},
);

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
        //# sourceMappingURL=GiftJump.js.map
        