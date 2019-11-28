(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/main/duanan.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c6d74OAJ79KG4fxIRTFyE2v', 'duanan', __filename);
// script/main/duanan.js

'use strict';

var global = require('Global');
cc.Class({
    extends: cc.Component,

    properties: {
        pressedScaler: 1.2,
        transDuration: 0.1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var scaleDownAction = cc.scaleTo(0.1, 0.8);
        function onTouchDown(event) {
            this.stopAllActions();
            this.runAction(scaleDownAction);
            global.sendHttpPost_times(global.openid);
            global.sendHttpPost_duan(function () {
                cc.director.loadScene("every_duan"); //切换场景
            });
        }

        this.node.on('touchstart', onTouchDown, this.node);
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
        //# sourceMappingURL=duanan.js.map
        