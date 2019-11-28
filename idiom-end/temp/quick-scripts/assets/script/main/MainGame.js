(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/main/MainGame.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1b965HjexpOXJlymEQEPjed', 'MainGame', __filename);
// script/main/MainGame.js

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
        var self = this;
        function onTouchDown(event) {
            this.stopAllActions();
            this.runAction(scaleDownAction);
            global.sendHttpPost(function () {
                cc.director.loadScene("game");
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
        //# sourceMappingURL=MainGame.js.map
        