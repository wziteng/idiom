(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/main/ItemTemplate.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8b455FLGIxJAKVhXpbmvlll', 'ItemTemplate', __filename);
// script/main/ItemTemplate.js

"use strict";

cc.Class({
    extends: cc.Component,
    properties: {
        Name: cc.Label,
        leaves: cc.Label,
        icon: cc.Sprite
    },
    // onLoad () {},
    init: function init(dates) {
        var self = this;
        self.Name.string = dates.Name;
        self.leaves.string = "完成第" + dates.leaves + "关";
        if (dates.leaves === dates.guan) {
            self.icon.spriteFrame = dates.nSF;
        }
        if (dates.leaves < dates.guan) {
            self.icon.spriteFrame = dates.lSF;
        }
        if (dates.leaves > dates.guan) {
            self.icon.spriteFrame = dates.sSF;
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
        //# sourceMappingURL=ItemTemplate.js.map
        