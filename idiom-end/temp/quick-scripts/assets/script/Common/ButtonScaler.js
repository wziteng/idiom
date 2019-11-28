(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Common/ButtonScaler.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6dd9fxOFYJPPqYYpwc94O7V', 'ButtonScaler', __filename);
// script/Common/ButtonScaler.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        pressedScaler: 1,
        transDuration: 0.2

    },
    onLoad: function onLoad() {
        var self = this;
        var initScale = this.node.scale;
        var scaleDownAction = cc.scaleTo(self.transDuration, this.pressedScale);
        var scaleUpAction = cc.scaleTo(self.transDuration, initScale);

        function onTouchDown(event) {
            this.stopAllActions();
            this.runAction(scaleDownAction);
        }

        function onTouchUp(event) {
            this.stopAllActions();
            this.runAction(scaleUpAction);
        }

        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
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
        //# sourceMappingURL=ButtonScaler.js.map
        