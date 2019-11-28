"use strict";
cc._RF.push(module, '17557qocQVKxKTn6X0UeR1K', 'main');
// script/duanan/main.js

'use strict';

var configloader = require('ConfigLoader'); //导入pareJson类
var global = require('Global');
cc.Class({
    extends: cc.Component,

    properties: {
        head_m: {
            type: cc.Node,
            default: null
        },
        head_w: {
            type: cc.Node,
            default: null
        },
        progress: {
            default: null,
            type: cc.Sprite
        },
        is_right: false,
        _width: 0,
        Pop_suc: {
            type: cc.Prefab,
            default: null
        },
        // home:cc.Button,
        is_show: false //当前窗口上有没有弹窗出现


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.init();
        this.runHeadAction();
        this.stopdispathEvent();
        this.up_slider();
    },
    BackHome: function BackHome() {
        if (global.times === 0) {
            global.times = 0;
        } else {
            global.times = global.times - 1;
            global.sendHttpPost_save_times(global.openid, global.times);
            global.JSONData.splice(0, global.JSONData.length);
        }
        cc.director.loadScene("main"); //切换场景
    },

    //返回到游戏场景
    Back: function Back() {
        var self = this;
        this.is_show = false;
        global.times = global.times - 1;
        global.sendHttpPost_save_times(global.openid, global.times);
        cc.director.loadScene('every_duan');
    },

    //进度条
    up_slider: function up_slider() {
        var self = this;
        self.slider = this.getComponent(cc.Slider); //获取Slider滑动组件
        if (self.slider === null || self.progress === null) {
            //判断是否为空
            return;
        }
        var len = 0.1;
        self._width = self.progress.node.width; //获取节点的宽度
        self.progress.node.width = this._width * self.slider.progress; //节点的宽度*slider的progress（0-1）之间
        self.node.on('update', function () {
            console.log('接收到了！');
            if (len < 1) {
                self.progress.node.width = self._width * len;
                len = len + 0.1;
            } else {
                len = 1;
            }
        });
    },

    //头部Action
    runHeadAction: function runHeadAction() {
        var rto = cc.repeatForever(cc.sequence(cc.rotateTo(0.3, 5), cc.rotateTo(0.6, -5), cc.rotateTo(0.3, 0)));
        // let ACTION_TAG=1;//给action设置标签
        // rto.setTag(ACTION_TAG);
        this.head_m.runAction(rto);
        this.head_w.runAction(rto.clone());
    },

    //停止事件冒泡传递（游戏开始的时候）
    stopdispathEvent: function stopdispathEvent() {
        var self = this;
        this.node.on('start_game', function (event) {
            event.stopPropagation();
            console.log("停止冒泡!");
            self.loadJson("words");
            self.show();
            self.setExplain();
        });
    },


    //停止事件冒泡传递（游戏结束的时候）
    game_overdispathEvent: function game_overdispathEvent(len) {
        var self = this;
        len = parseInt(len);
        console.log(len);
        this.node.on('game_over', function (event) {
            event.stopPropagation();
            if (!self.is_show) {
                console.log('时间到了,游戏结束！' + len);
                self.right_num.string = '你答对了' + (8 - len) + '题';
                self.Time.setPosition(0, 0);
                return;
            } else {
                console.log('已经有弹窗了！');
                return;
            }
        });
    },


    //初始化
    init: function init() {
        this.bg = cc.find('Canvas/bg').getComponent(cc.Sprite);
        this.right_num = cc.find('Canvas/TimeOut/right_num').getComponent(cc.Label);
        this.Fail = cc.find('Canvas/Failure');
        this.Time = cc.find('Canvas/TimeOut');
        this.st = cc.find('Canvas/start');
        this.idiom = cc.find('Canvas/idiom');
        this.answer = cc.find('Canvas/answer');
        this.labels = this.node.getChildByName('idiom').getComponentsInChildren(cc.Label);
        this.ans_labels = this.node.getChildByName('answer').getComponentsInChildren(cc.Label);
        this.ex_labels = cc.find('Canvas/Failure/bg/idiom_ex').getComponentsInChildren(cc.Label);
        this.idiom_nodes = []; //存放断案场景的成语
        this.ex_word = cc.find('Canvas/Failure/bg/explain/ex_word').getComponent(cc.Label);
        this.hide(); //一开始默认为不显示
        for (var i = 1; i <= 4; i++) {
            var sp_node = cc.find('Canvas/idiom/w_' + i);
            this.idiom_nodes.push(sp_node);
        }
    },


    //右边点击
    Right_click: function Right_click(event, customdata) {
        console.log('Right: ' + customdata); //2
        this.node.emit('type_R');
    },

    //左边点击
    Left_click: function Left_click(event, customdata) {
        console.log('Left: ' + customdata); //1
        this.node.emit('type_L');
    },


    //控制文字节点是否显示
    show: function show() {
        this.idiom.active = true;
        this.answer.active = true;
    },
    hide: function hide() {
        this.idiom.active = false;
        this.answer.active = false;
    },
    doNext: function doNext(res) {
        console.log(res);
        this.arr = res;
        this.len = this.arr.length - 1;
        this.index = this.arr[this.len].index; //不显示的坐标
        this.rightIndex = this.arr[this.len].RightIndex;
        this.result_L = 1;
        this.result_R = 2;
        var self = this;
        this.node.on('type_R', function () {
            console.log('RRRR');
            var answer = self.arr[self.len].answer[1];
            self.changeIdiom(self.index, answer);
            console.log(answer);
            self.CheckAnswer(self.result_R, self.rightIndex, self.len, self.arr);
            console.log(self.result_R);
            if (self.is_right) {
                console.log('isrighttttttt');
                if (self.len > 0) {
                    self.len = self.len - 1;
                } else if (self.len === 0) {
                    self.len = 0;
                }
                self.index = self.arr[self.len].index;
                self.rightIndex = self.arr[self.len].RightIndex;
                self.scheduleOnce(function () {
                    self.setIdiom(self.arr, self.len, self.index);
                }, 1);
                self.resetColor();
            } else {
                console.log('isfaulesssss');
            }
            self.game_overdispathEvent(self.len);
        });
        this.node.on('type_L', function () {
            console.log('LLLL');
            var answer = self.arr[self.len].answer[0];
            self.changeIdiom(self.index, answer);
            console.log(answer);
            self.CheckAnswer(self.result_L, self.rightIndex, self.len, self.arr);
            console.log(self.result_L);
            if (self.is_right) {
                if (self.len > 0) {
                    self.len = self.len - 1;
                } else if (self.len === 0) {
                    self.len = 0;
                }
                self.index = self.arr[self.len].index;
                self.rightIndex = self.arr[self.len].RightIndex;
                console.log('isrighttttttt');
                self.scheduleOnce(function () {
                    self.setIdiom(self.arr, self.len, self.index);
                }, 1);
                self.resetColor();
            } else {
                console.log('isfaulesssss');
            }
            self.game_overdispathEvent(self.len);
        });
    },


    //给成语赋值，填入
    setIdiom: function setIdiom(arr, len, index) {
        if (len >= 0) {
            for (var i = 0; i < arr[len].words.length; i++) {
                this.labels[i].string = arr[len].words[i];
            }
            this.labels[index].string = '';
            //给答案赋值
            for (var _i = 0; _i < arr[len].answer.length; _i++) {
                this.ans_labels[_i].string = arr[len].answer[_i];
            }
        }
    },

    //设置解释
    setExplain: function setExplain() {
        var self = this;
        this.node.on('failure', function (len, arr) {
            console.log(len);
            console.log(arr);
            for (var i = 0; i < arr[len].words.length; i++) {
                self.ex_labels[i].string = arr[len].words[i];
            }
            self.ex_word.string = '成语解释:' + arr[len].explain.toString();
            self.Fail.setPosition(0, 0);
        });
    },

    //重置颜色
    resetColor: function resetColor() {
        this.scheduleOnce(function () {
            for (var i = 0; i < 4; i++) {
                this.idiom_nodes[i].color = new cc.Color(255, 255, 255, 255);
            }
        }, 1);
    },

    //改变成语
    changeIdiom: function changeIdiom(index, answer) {
        this.labels[index].string = answer.toString();
    },

    //判断正误
    CheckAnswer: function CheckAnswer(num, rightIndex, len, arr) {
        var self = this;
        if (num === rightIndex) {
            self.node.emit('update');
            self.is_right = true;
            for (var i = 0; i < 4; i++) {
                this.idiom_nodes[i].color = new cc.Color(53, 250, 7, 255);
            }
            if (len === 0) {
                global.times = 0;
                global.sendHttpPost_save_times(global.openid, global.times);
                var Pop_Pre = cc.instantiate(self.Pop_suc);
                self.is_show = true;
                self.scheduleOnce(function () {
                    self.node.addChild(Pop_Pre);
                }, 1);
            }
        } else {
            self.is_right = false;
            for (var _i2 = 0; _i2 < 4; _i2++) {
                this.idiom_nodes[_i2].color = new cc.Color(247, 0, 47, 255);
            }
            self.is_show = true;
            self.node.emit('failure', len, arr);
        }
    },


    //加载json，通过调用configloader中的loadJson方法，之后通过callback将数据返回
    loadJson: function loadJson() {
        var self = this;
        configloader.loadJson(global.Duan_JSONData, function (res) {
            var arr = res;
            var len = arr.length - 1;
            var index = arr[len].index;
            self.setIdiom(arr, len, index);
            self.st.active = false;
            self.doNext(res);
        });
    }
}

// update (dt) {},
);

cc._RF.pop();