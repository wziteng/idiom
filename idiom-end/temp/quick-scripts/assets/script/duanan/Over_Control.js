(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/duanan/Over_Control.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ce84b2J5r5Bb6sfoRfeUAB1', 'Over_Control', __filename);
// script/duanan/Over_Control.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.on('Back', function () {
            cc.director.loadScene('main');
        });
    },
    Back: function Back(event, data) {
        this.node.emit('Back');
    },
    OK: function OK(event, data) {
        this.node.emit('Back');
    },
    start: function start() {}

    // update (dt) {},

});

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
        //# sourceMappingURL=Over_Control.js.map
        