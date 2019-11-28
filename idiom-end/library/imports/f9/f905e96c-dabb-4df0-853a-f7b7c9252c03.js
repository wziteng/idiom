"use strict";
cc._RF.push(module, 'f905els2rtN8IU697fJJSwD', 'loadimgs');
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