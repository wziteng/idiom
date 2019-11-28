(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/game/gameOverButton.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6e6881jkDhEl4BrL6vlZgHl', 'gameOverButton', __filename);
// script/game/gameOverButton.js

"use strict";

var global = require('Global');
cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    goHome: function goHome() {
        global.JSONData.splice(0, global.JSONData.length);
        cc.director.loadScene("main"); //切换场景
    },
    nextGame: function nextGame() {
        global.checkpoint = global.checkpoint + 1;
        global.JSONData.splice(0, global.JSONData.length);
        console.log("下一关");
        global.sendHttpPost(function () {
            cc.director.loadScene("game");
        });
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
        //# sourceMappingURL=gameOverButton.js.map
        