"use strict";
cc._RF.push(module, 'a8a4fGhheRHkbiui6uKGtx9', 'Idiom');
// script/game/Idiom.js

'use strict';

var global = require('Global');
var CELL_STATE = {
    DEFAULT: 0,
    HIDE: 1, //隐藏
    UNCHOSE: 2, //被选中，红框
    UNFILL: 3, //填了格子变黄变黄
    WRONG: 4, //填错字变红
    RIGHT: 5 //正确字变白，格子变绿
};
var value = 0;
var _gameOver = 0;
var chose = 0;
cc.Class({
    extends: cc.Component,
    properties: {
        item: cc.Node,
        content: cc.Node,
        guan: cc.Node
    },

    onLoad: function onLoad() {},
    start: function start() {
        var self = this;
        self.initBoard(global.JSONData);
    },


    //键盘的注册事件
    _registerKeyEvent: function _registerKeyEvent() {
        for (var i = 0; i < this.Hide.length; i++) {
            var item = this.content.children[i];
            item.on('touchstart', this._onTouchKeyStarts.bind(this, i), this);
        }
    },
    _onTouchKeyStarts: function _onTouchKeyStarts(index, event) {
        this.hideIndex = index;
        var target = event.target;
        var label = target.getChildByName('New Label').getComponent(cc.Label);
        var key = label.string;
        var NewHide = [];
        for (var i = 0; i < this.Hide.length; i++) {
            if (this.Hide[i].hideIndex === chose || this.Hide[i].hideIndex === value) {
                console.log(key);
                console.log(this.Hide[i].word);
                if (key === this.Hide[i].word) {
                    this.setWordByIndexs(255, this.Hide[i].hideIndex); //显示字
                    if (chose) {
                        //点击跳转
                        this.setBgStateByIndex(CELL_STATE.DEFAULT, chose);
                        this.setWordByIndex(key, chose); //替换字
                        this.Hide.splice(this.hideIndex, 1, { word: null, hideIndex: null });
                        var item = this.item.children[chose].getComponent(cc.Button);
                        item.node.pauseSystemEvents(true);
                        //点击之后自动跳转
                        for (var j = 0; j < this.Hide.length; j++) {
                            console.log(this.Hide[j].word);
                            if (this.Hide[j].word !== null) {
                                NewHide.push(this.Hide[j]);
                            }
                        }
                        for (var _i = 0; _i < NewHide.length; _i++) {
                            if (_i + 1 === NewHide.length) {
                                chose = NewHide[_i].hideIndex;
                            } else {
                                chose = NewHide[_i + 1].hideIndex;
                            }
                        }
                        this.setBgStateByIndex(CELL_STATE.UNCHOSE, chose);
                    } else if (value && value !== 0) {
                        //自动跳转
                        this.setWordByIndex(key, value); //替换字
                        this.setBgStateByIndex(CELL_STATE.DEFAULT, value);
                        var _item = this.item.children[value].getComponent(cc.Button);
                        _item.node.pauseSystemEvents(true);
                        if (i + 1 === this.Hide.length) {
                            value = this.Hide[i].hideIndex;
                        } else {
                            value = this.Hide[i + 1].hideIndex;
                        }
                        this.setBgStateByIndex(CELL_STATE.UNCHOSE, value);
                    }
                    this.Hide.splice(this.hideIndex, 1, { word: null, hideIndex: null });
                    _gameOver = _gameOver + 1;
                    if (_gameOver === this.Hide.length) {
                        this.gameOver();
                    }
                    var items = this.content.children[index]; //正确的字消失
                    items.active = false;
                    return;
                } else {
                    if (chose) {
                        this.setWordByIndex(key, chose);
                        this.setWordByIndexs(255, this.Hide[i].hideIndex);
                        this.setBgStateByIndex(CELL_STATE.WRONG, chose);
                    } else {
                        this.setWordByIndex(key, value);
                        this.setWordByIndexs(255, this.Hide[i].hideIndex);
                        this.setBgStateByIndex(CELL_STATE.WRONG, value);
                    }
                }
            }
        }
    },


    //给格子注册监听事件
    _registerClickEvent: function _registerClickEvent() {
        //给需要填空的格子添加监听事件
        for (var i = 0; i < this.Hide.length; i++) {
            var index = this.Hide[i].hideIndex;
            var item = this.item.children[index].getComponent(cc.Button); //button
            item.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart.bind(this, index), this);
        }
    },
    _onTouchStart: function _onTouchStart(index, event) {
        if (chose || chose === 0) {
            this.setBgStateByIndex(CELL_STATE.DEFAULT, chose);
            this.sta = CELL_STATE.DEFAULT;
        }
        this.setBgStateByIndex(CELL_STATE.DEFAULT, value);
        chose = index;
        this.setBgStateByIndex(CELL_STATE.UNCHOSE, chose);
        value = 0;
        console.log(index);
        if (this.sta === CELL_STATE.RIGHT) {
            this.setWordByIndexs(255, index);
        } else {
            this.setWordByIndexs(0, index); //撤销填上去的字
        }
    },

    //选者格子自动跳转
    macthGezi: function macthGezi(index) {
        this.value = index;
        this.setBgStateByIndex(CELL_STATE.UNCHOSE, index);
    },

    //初始化棋盘，显示所有成语
    initBoard: function initBoard(data) {
        console.log(data);
        var jsons = data;
        for (var i = 0; i < jsons.length; i++) {
            var idiom = jsons[i].idiom;
            var direction = jsons[i].direction;
            var index = jsons[i].index;
            var wordList = [];
            var idiomList = idiom.split('');
            var hideword = jsons[i].hideword;
            var hideList = [];
            var HideList = hideword.split('');
            for (var j = 0; j < idiomList.length; j++) {
                //成语
                var wordData = {};
                var space = direction === 1 ? 1 : 9;
                wordData.index = index + space * j;
                wordData.word = idiomList[j];
                var hideData = {};
                hideData.word = HideList[j];
                wordList.push(wordData);
                //缺少的字和成语中的字匹配就把这个字和坐标存储在hide list中
                if (wordList[j].word === HideList[j]) {
                    hideData.hideIndex = wordList[j].index;
                    hideList.push(hideData);
                }
            }
            jsons[i].wordList = wordList;
            jsons[i].hideList = hideList;
        }

        //隐藏格子上的所有文字
        for (var _i2 = 0; _i2 < this.item.children.length; _i2++) {
            this.item.children[_i2].opacity = 0;
        }
        //显示文字
        for (var _i3 = 0; _i3 < jsons.length; _i3++) {
            for (var _j = 0; _j < jsons[_i3].wordList.length; _j++) {
                var _wordData = jsons[_i3].wordList[_j];
                this.item.children[_wordData.index].opacity = 255;
                this.setWordByIndex(_wordData.word, _wordData.index); //显示的文字
                this.setBgStateByIndex(CELL_STATE.DEFAULT, _wordData.index);
            }
        }
        //隐藏键盘上的所有文字
        for (var _i4 = 0; _i4 < this.content.children.length; _i4++) {
            this.content.children[_i4].opacity = 0;
        }
        //隐藏的文字存在一个数组中
        var hide = [];
        for (var _i5 = 0; _i5 < jsons.length; _i5++) {
            for (var _j2 = 0; _j2 < jsons[_i5].hideList.length; _j2++) {
                var hideWord = jsons[_i5].hideList[_j2];
                hide.push(hideWord);
            }
        }
        //在键盘上显示隐藏的文字
        for (var _i6 = 0; _i6 < hide.length; _i6++) {
            this.content.children[_i6].opacity = 255;
            this.setKeyWordByIndex(hide[_i6].word, _i6); //显示被隐藏的字到键盘上
            this.setHideWordByIndex(hide[_i6].word, hide[_i6].hideIndex); //隐藏格子上的字
        }
        this.Hide = hide;
        this._registerClickEvent();
        this._registerKeyEvent();
        value = this.Hide[0].hideIndex;
        this.macthGezi(value);

        //显示关卡
        var checkpoint = this.guan.getComponent(cc.Label);
        checkpoint.string = "第" + global.checkpoint + "关";
    },

    //初始化格子上和键盘上的文字
    setWordByIndex: function setWordByIndex(string, index) {
        var item = this.item.children[index].children[0];
        var label = item.getChildByName('Label').getComponent(cc.Label);
        label.string = string;
    },
    setKeyWordByIndex: function setKeyWordByIndex(string, index) {
        var items = this.content.children[index];
        var item = items.getChildByName('New Label').getComponent(cc.Label);
        item.string = string;
    },

    //隐藏需要填的文字
    setHideWordByIndex: function setHideWordByIndex(string, hideIndex) {
        var hideItem = this.item.children[hideIndex].children[0]; //需要填的词index值
        var hideLabel = hideItem.getChildByName('Label').getComponent(cc.Label).node;
        hideLabel.opacity = 0;
        hideLabel.string = string;
    },

    //撤销填的字的方法
    setWordByIndexs: function setWordByIndexs(opacity, hideIndex) {
        var hideItem = this.item.children[hideIndex].children[0]; //需要填的词index值
        var hideLabel = hideItem.getChildByName('Label').getComponent(cc.Label).node;
        hideLabel.opacity = opacity;
    },

    //设置背景的状态
    setBgStateByIndex: function setBgStateByIndex(state, index) {
        var item = this.item.children[index].children[0];
        var itemBg = item.getChildByName('New Sprite').getComponent(cc.Sprite).node; //需要填的词index值
        var color = void 0;
        if (state === CELL_STATE.DEFAULT) {
            color = new cc.Color().fromHEX("#CF9AF3");
        } else if (state === CELL_STATE.UNCHOSE) {
            color = new cc.Color().fromHEX('#A095F6'); //选中
        } else if (state === CELL_STATE.WRONG) {
            color = new cc.Color().fromHEX('#F84C53'); //错误
        } else if (state === CELL_STATE.RIGHT) {
            color = new cc.Color().fromHEX('#44ECD8'); //正确
        }
        itemBg.color = color;
    },
    goHome: function goHome() {
        global.JSONData.splice(0, global.JSONData.length);
        cc.director.loadScene("main"); //切换场景
    },

    // update (dt) {},
    gameOver: function gameOver() {
        cc.director.loadScene("gameOver"); //切换场景
        _gameOver = 0;
    }
});

cc._RF.pop();