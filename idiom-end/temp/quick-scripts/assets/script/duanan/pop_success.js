(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/duanan/pop_success.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6c52dn6cmxA/p8vnyKMEeeV', 'pop_success', __filename);
// script/duanan/pop_success.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        bt: {
            type: cc.Node,
            default: null
        },
        GameOverPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {
        this.bt.on('click', function () {
            console.log('点击！！！');
            this.initGameOverPrefab();
        }, this);
    },
    initGameOverPrefab: function initGameOverPrefab() {
        var item = cc.instantiate(this.GameOverPrefab);
        item.setPosition(0, 0);
        this.node.addChild(item);
    }

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
        //# sourceMappingURL=pop_success.js.map
        