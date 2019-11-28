"use strict";
cc._RF.push(module, 'fb9ebY2nVZHgLmTLpIVG9dg', 'tiaozhan');
// script/game/tiaozhan.js

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
var Constants = require('Constants');
var GAME_STATE = Constants.GAME_STATE;
var STAND = Constants.STAND;
var value = 0;
var gameOver = 0;
var chose = 0;
var Hide = [];
var a = false;
cc.Class({
    extends: cc.Component,
    properties: {
        item: cc.Node,
        content: cc.Node,
        gameState: {
            default: GAME_STATE.PREPARE,
            type: GAME_STATE
        },
        infoLabel: cc.Label
    },

    onLoad: function onLoad() {
        this.fun(); //判断游戏进度
    },
    start: function start() {
        var self = this;
        self.initBoard(global.JSONData);
        self.gameState = GAME_STATE.PLAYING;
        self.showInfo('start game', 0);
    },
    fun: function fun() {
        var self = this;
        global.roomSocket.on('type', function (type) {
            if (type === 0) {
                console.log('游戏进行中');
            }
        });

        global.roomSocket.on('bover', function (type) {
            //黑棋胜
            self.showInfo('game over', type);
            console.log(type);
        });
        global.roomSocket.on('wover', function (type) {
            //白棋胜
            console.log(type);
            self.showInfo('game over', type);
        });
    },
    showInfo: function showInfo(type, num) {
        if (type === 'start game') {
            if (global.stand === STAND.BLACK) {
                this.infoLabel.string = global.nickName;
            } else if (global.stand === STAND.WHITE) {
                this.infoLabel.string = global.nickName;
            }
        } else if (type === 'game over') {
            if (num === 1) {
                cc.director.loadScene("tiaozhanOver"); //切换场景
                global.win = '挑战失败';
            } else if (num === 2) {
                cc.director.loadScene("tiaozhanOver"); //切换场景
                global.win = '挑战失败';
            } else {
                console.log('游戏结束\n平局');
                global.win = '平局';
                cc.director.loadScene("tiaozhanOver"); //切换场景
            }
        }
    },


    //键盘的注册事件
    _registerKeyEvent: function _registerKeyEvent() {
        for (var i = 0; i < Hide.length; i++) {
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
        for (var i = 0; i < Hide.length; i++) {
            if (Hide[i].index === chose || Hide[i].index === value) {
                console.log(key);
                console.log(Hide[i].word);
                if (key === Hide[i].word) {
                    this.setWordByIndexs(255, Hide[i].index); //显示字
                    if (chose) {
                        //点击跳转
                        this.setBgStateByIndex(CELL_STATE.DEFAULT, chose);
                        this.setWordByIndex(key, chose); //替换字
                        Hide.splice(index, 1, { word: null, index: null });
                        var item = this.item.children[chose].getComponent(cc.Button);
                        item.node.pauseSystemEvents(true);
                        //点击之后自动跳转
                        for (var j = 0; j < Hide.length; j++) {
                            console.log(Hide[j].word);
                            if (Hide[j].word !== null) {
                                NewHide.push(Hide[j]);
                            }
                        }
                        for (var _i = 0; _i < NewHide.length; _i++) {
                            if (_i + 1 === NewHide.length) {
                                chose = NewHide[_i].index;
                            } else {
                                chose = NewHide[_i + 1].index;
                            }
                        }
                        this.setBgStateByIndex(CELL_STATE.UNCHOSE, chose);
                    } else if (value && value !== 0) {
                        //自动跳转
                        this.setWordByIndex(key, value); //替换字
                        this.setBgStateByIndex(CELL_STATE.DEFAULT, value);
                        var _item = this.item.children[value].getComponent(cc.Button);
                        _item.node.pauseSystemEvents(true);
                        if (i + 1 === Hide.length) {
                            value = Hide[i].index;
                        } else {
                            value = Hide[i + 1].index;
                        }
                        this.setBgStateByIndex(CELL_STATE.UNCHOSE, value);
                    }
                    Hide.splice(index, 1, { word: null, index: null });
                    gameOver = gameOver + 1;
                    if (gameOver === Hide.length) {
                        gameOver = 0;
                        global.roomSocket.emit('type', global.stand);
                    }
                    var items = this.content.children[index]; //正确的字消失
                    items.active = false;
                    return;
                } else {
                    if (chose) {
                        this.setWordByIndex(key, chose);
                        this.setWordByIndexs(255, Hide[i].index);
                        this.setBgStateByIndex(CELL_STATE.WRONG, chose);
                    } else {
                        this.setWordByIndex(key, value);
                        this.setWordByIndexs(255, Hide[i].index);
                        this.setBgStateByIndex(CELL_STATE.WRONG, value);
                    }
                }
            }
        }
    },


    //给格子注册监听事件
    _registerClickEvent: function _registerClickEvent() {
        //给需要填空的格子添加监听事件
        for (var i = 0; i < Hide.length; i++) {
            var index = Hide[i].index;
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
        console.log(jsons);
        //隐藏格子上的所有文字
        for (var _i2 = 0; _i2 < this.item.children.length; _i2++) {
            this.item.children[_i2].opacity = 0;
        }
        //显示文字
        for (var _i3 = 0; _i3 < jsons.length; _i3++) {
            for (var _j = 0; _j < jsons[_i3].wordList.length; _j++) {
                var _wordData = jsons[_i3].wordList[_j];
                this.item.children[_wordData.index].opacity = 255;
                this.setHideWordByIndex(_wordData.word, _wordData.index);
            }
        }
        //隐藏键盘上的所有文字
        for (var _i4 = 0; _i4 < this.content.children.length; _i4++) {
            this.content.children[_i4].opacity = 0;
        }
        //隐藏的文字存在一个数组中
        var hide = [];
        for (var _i5 = 0; _i5 < jsons.length; _i5++) {
            for (var _j2 = 0; _j2 < jsons[_i5].wordList.length; _j2++) {
                var hideWord = jsons[_i5].wordList[_j2];
                hide.push(hideWord);
            }
        }
        var newhide = this.unique(hide);
        //在键盘上显示隐藏的文字
        for (var _i6 = 0; _i6 < newhide.length; _i6++) {
            this.content.children[_i6].opacity = 255;
            this.setKeyWordByIndex(newhide[_i6].word, _i6); //显示被隐藏的字到键盘上
        }
        Hide = newhide;
        this._registerClickEvent();
        this._registerKeyEvent();
        value = Hide[0].index;
        this.macthGezi(value);
    },
    unique: function unique(hide) {
        var uniques = [];
        var stringify = {};
        for (var i = 0; i < hide.length; i++) {
            var keys = Object.keys(hide[i]);
            keys.sort(function (a, b) {
                return Number(a) - Number(b);
            });
            var str = '';
            for (var j = 0; j < keys.length; j++) {
                str += JSON.stringify(keys[j]);
                str += JSON.stringify(hide[i][keys[j]]);
            }
            if (!stringify.hasOwnProperty(str)) {
                uniques.push(hide[i]);
                stringify[str] = true;
            }
        }
        uniques = uniques;
        return uniques;
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
        global.roomSocket.disconnect();
        cc.director.loadScene("main"); //切换场景
    },

    // update (dt) {},
    gameOver: function gameOver() {
        a = true;
        // if (global.stand === STAND.BLACK) {
        //     global.type=1;
        //     global.roomSocket.emit('type',global.type);
        // } else if (global.stand === STAND.WHITE) {
        //     global.type=2;
        //     global.roomSocket.emit('type',global.type);
        // }
        // this.fun();
        // this.showInfo('game over');
        // cc.director.loadScene("tiaozhanOver"); //切换场景
        // gameOver = 0;
    }
});

cc._RF.pop();