(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/game/gameButton.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e14bcJdbd9DwIQG6JIjv1ox', 'gameButton', __filename);
// script/game/gameButton.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        home: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.preloadScene('main');
    },
    start: function start() {
        this.home.on('click', function () {
            cc.director.loadScene('main');
        }, this);
    }
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
        //# sourceMappingURL=gameButton.js.map
        