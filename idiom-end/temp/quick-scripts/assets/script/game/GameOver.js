(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/game/GameOver.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '40b81JnvI1Pb7MF09cB8/h4', 'GameOver', __filename);
// script/game/GameOver.js

'use strict';

var global = require('Global');
var idioms = null;
var index = 0;
var loadImages = require('loadimgs');
cc.Class({
    extends: cc.Component,

    properties: {
        idiom: cc.Node,
        tanchuang: cc.Node,
        bg: cc.Sprite,
        guan: cc.Node

    },

    onLoad: function onLoad() {
        var self = this;
        self.init(global.JSONData);
        loadImages.loadImages('bg', 'bg_gradient_mask', self.bg);
    },
    init: function init(data) {
        var datas = data;
        console.log(datas);
        var checkpoint = this.guan.getComponent(cc.Label);
        checkpoint.string = "第" + global.checkpoint + "关";
        var wordList = [];
        for (var i = 0; i < datas.length; i++) {
            var idiom = datas[i].idiom; //成语
            var pingyin = datas[i].pingyin;
            var explain = datas[i].explain;
            var _wordList = [];
            var idiomList = idiom.split('');
            var pingyinList = pingyin.split('|');
            console.log(pingyinList);
            console.log(idiomList.length);
            for (var j = 0; j < idiomList.length; j++) {
                //成语
                var wordData = {};
                wordData.word = idiomList[j];
                wordData.pingyin = pingyinList[j];
                _wordList.push(wordData);
            }
            datas[i].wordList = _wordList;
        }
        // console.log(datas);
        idioms = datas; //赋值给全局变量
        //隐藏所有成语
        for (var _i = 0; _i < this.idiom.children.length; _i++) {
            this.idiom.children[_i].opacity = 0;
        }
        //显示本关的成语
        //在键盘上显示隐藏的文字
        for (var _i2 = 0; _i2 < datas.length; _i2++) {
            this.idiom.children[_i2].opacity = 255;
            this.setIdiomInIndex(datas[_i2].idiom, _i2);
        }
        this._registerClickEvent();
    },
    _registerClickEvent: function _registerClickEvent() {
        //给需要填空的格子添加监听事件
        // console.log()
        for (var i = 0; i < idioms.length; i++) {
            var item = this.idiom.children[i];
            item.on('touchstart', this._onTouchStart.bind(this, i), this);
        }
    },
    _onTouchStart: function _onTouchStart(indexs) {
        index = indexs;
        // console.log(index);
    },


    //显示本关中的成语
    setIdiomInIndex: function setIdiomInIndex(string, index) {
        var idioms = this.idiom.children[index].children[0];
        var idiom = idioms.getChildByName('Label').getComponent(cc.Label);
        idiom.string = string;
    },


    //显示弹窗
    show: function show() {
        this.tanchuang.position = cc.v2(0, 0);
        // console.log(index);
        var top = this.tanchuang.getChildByName('top').getChildByName('right'); //显示拼音的头部
        var expains = this.tanchuang.getChildByName('explain').getChildByName('bottom'); //释义
        for (var i = 0; i < top.children.length; i++) {
            var pinyin = top.children[i].children[0].getComponent(cc.Label); //拼音
            var item = top.children[i].children[1].getComponent(cc.Label); //字
            var explain = expains.children[0].getComponent(cc.Label);
            pinyin.string = idioms[index].wordList[i].pingyin;
            item.string = idioms[index].wordList[i].word;
            explain.string = idioms[index].explain;
        }
    },
    hide: function hide() {
        this.tanchuang.position = cc.v2(2000, 0);
    },

    // start () {},
    update: function update(dt) {}
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
        //# sourceMappingURL=GameOver.js.map
        