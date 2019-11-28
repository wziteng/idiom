(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/loadImages/duanimgs.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b44b2WDdXBE45xFg0gH+XRy', 'duanimgs', __filename);
// script/loadImages/duanimgs.js

'use strict';

var loadImages = require('loadimgs');
cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {
        this.initSprite();
    },
    initSprite: function initSprite() {
        var sprites = [];
        this.bg = cc.find('Canvas/bg').getComponent(cc.Sprite);
        this.p_M_body = cc.find('Canvas/bg/person_m/body').getComponent(cc.Sprite);
        this.p_M_head = cc.find('Canvas/bg/person_m/head').getComponent(cc.Sprite);
        this.p_W_body = cc.find('Canvas/bg/person_w/body').getComponent(cc.Sprite);
        this.p_W_head = cc.find('Canvas/bg/person_w/head').getComponent(cc.Sprite);
        this.Failure_Bg = cc.find('Canvas/Failure/stop_bg').getComponent(cc.Sprite);
        sprites.push(this.bg, this.p_M_body, this.p_M_head, this.p_W_body, this.p_W_head, this.Failure_Bg);
        console.log(sprites);
        var paths = ['bg', 'person', 'person', 'person', 'person', 'bg'];
        var names = ['duanan', 'nan_shen', 'nan_tou', 'nv_shen', 'nv_tou', 'singleColor'];
        for (var i = 0; i < paths.length; i++) {
            loadImages.loadImages(paths[i], names[i], sprites[i]);
        }
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
        //# sourceMappingURL=duanimgs.js.map
        