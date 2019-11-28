(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/game/tiaozhanOverButton.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e784a+9BNJCP63F1uNHM4km', 'tiaozhanOverButton', __filename);
// script/game/tiaozhanOverButton.js

'use strict';

var global = require('Global');
var Constants = require('Constants');
var STAND = Constants.STAND;
cc.Class({
    extends: cc.Component,

    properties: {
        rankTop: cc.Node
    },

    // onLoad () {},
    goHome: function goHome() {
        global.JSONData.splice(0, global.JSONData.length);
        global.win = '你赢了';
        global.roomSocket.disconnect();
        cc.director.loadScene("main"); //切换场景
    },
    Rank: function Rank() {
        this.rankTop.active = true;
        sdk.postMessage({ scene: 'showTop3' });
    },
    hide: function hide() {
        this.rankTop.active = false;
        sdk.postMessage({ scene: 'hide' });
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
        //# sourceMappingURL=tiaozhanOverButton.js.map
        