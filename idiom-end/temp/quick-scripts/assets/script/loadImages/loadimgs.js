(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/loadImages/loadimgs.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f905els2rtN8IU697fJJSwD', 'loadimgs', __filename);
// script/loadImages/loadimgs.js

"use strict";

var loadImages = {
    //从服务器加载图片
    loadImages: function loadImages(path, name, sprite) {
        var self = this;
        var url = "https://game.i--j.com/images/Texture/" + path + "/" + name + ".png";
        cc.loader.load(url, function (err, texture) {
            sprite.spriteFrame = new cc.SpriteFrame(texture);
        });
    }
};
module.exports = loadImages;

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
        //# sourceMappingURL=loadimgs.js.map
        