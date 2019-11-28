(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/main/Gongming.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5c39d2DIaVKWK/+NULu5blj', 'Gongming', __filename);
// script/main/Gongming.js

'use strict';

cc.Class({
    extends: cc.Component,
    properties: {
        //官名背景色
        sSF: cc.SpriteFrame, //之前灰色
        nSF: cc.SpriteFrame, //之中黄色
        lSF: cc.SpriteFrame, //之后蓝色
        scrollView: cc.ScrollView,
        gmPrafeb: cc.Prefab,
        titleLabel: cc.Label,
        gongming: {
            default: null,
            type: cc.JsonAsset
        }
    },

    onLoad: function onLoad() {
        var self = this;
        //自己的关卡
        var guan = 220;
        cc.loader.loadRes('./gongming.json', function (err, object) {
            if (err) {
                console.log(err);
                return;
            }
            var data = object.json;
            self.init();
            for (var i = 0; i < data.length; ++i) {
                var item = cc.instantiate(self.gmPrafeb);
                var dates = data[i];
                dates.sSF = self.sSF;
                dates.nSF = self.nSF;
                dates.lSF = self.lSF;
                dates.guan = guan;
                self.scrollView.content.addChild(item);
                item.getComponent('ItemTemplate').init({
                    Name: dates.name,
                    leaves: dates.leaves,
                    sSF: dates.sSF, //之前灰色
                    nSF: dates.nSF, //之中黄色
                    lSF: dates.lSF,
                    guan: dates.guan
                });
            }
        });
        this.gongmingLabel();
        this.homeLabel();
    },
    init: function init() {
        this.mingzis = [];

        for (var index = 0; index < this.totalCount; index++) {
            var mingzi = this.addHeroSlot();
            this.mingzis.push(mingzi);
        }
    },
    addHeroSlot: function addHeroSlot() {
        var mingzi = cc.instantiate(this.gmPrafeb);
        this.scrollView.content.addChild(mingzi);
        return mingzi;
    },
    gongmingLabel: function gongmingLabel() {
        //点击人物或名字标签
        this.titleLabel.string = "考取功名";
    },
    homeLabel: function homeLabel() {
        //点击房子
        this.titleLabel.string = "买房置地";
    },
    show: function show() {
        this.node.active = true;
        this.node.emit("fade-in");
    },
    hide: function hide() {
        // this.node.active = false ;
        this.node.emit("fade-out");
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
        //# sourceMappingURL=Gongming.js.map
        