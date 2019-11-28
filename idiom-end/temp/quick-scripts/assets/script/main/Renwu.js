(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/main/Renwu.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ce482Bn8SpOKo3C7ZmX67/2', 'Renwu', __filename);
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
        //# sourceMappingURL=Renwu.js.map
        