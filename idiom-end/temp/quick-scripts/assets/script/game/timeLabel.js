(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/game/timeLabel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ecbe4t0R1NMQq8sf84CwDAb', 'timeLabel', __filename);
// script/game/timeLabel.js

"use strict";

var global = require('Global');
cc.Class({
    extends: cc.Component,

    properties: {
        tiemLabel: cc.Label,
        fenTime: 0,
        miaoTime: 0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    update: function update(dt) {
        this.fenTime = 0;
        this.miaoTime += dt;
        var miao = Math.floor(this.miaoTime);
        if (miao % 60 === 0) {
            this.fenTime = this.fenTime + 1;
        }
        this.tiemLabel.string = this.fenTime + "分" + miao + "秒";
        global.time = this.tiemLabel.string;
        global.fen = this.fenTime;
        global.miao = miao;
    }
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
        //# sourceMappingURL=timeLabel.js.map
        