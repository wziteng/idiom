let global=require('Global');
let idioms = null;
let index = 0;
let loadImages=require('loadimgs');
cc.Class({
    extends: cc.Component,

    properties: {
        idiom: cc.Node,
        tanchuang: cc.Node,
        bg:cc.Sprite,
        guan:cc.Node,
        win:cc.Node,

    },

    onLoad() {
        let self = this;
        self.init(global.JSONData);
        loadImages.loadImages('bg','bg_gradient_mask',self.bg);
    },
    init(data) {
        let datas = data;
        let checkpoint = this.guan.getComponent(cc.Label);
        let win = this.win.getComponent(cc.Label);
        checkpoint.string = global.time;
        win.string = global.win;
        let wordList = [];
        for (let i = 0; i < datas.length; i++) {
            let idiom = datas[i].idiom;  //成语
            let pingyin = datas[i].pingyin;
            let explain = datas[i].explain;
            let wordList = [];
            let idiomList = idiom.split('');
            let pingyinList = pingyin.split('|');
            for (let j = 0; j < idiomList.length; j++) {
                //成语
                let wordData = {};
                wordData.word = idiomList[j];
                wordData.pingyin = pingyinList[j];
                wordList.push(wordData);
            }
            datas[i].wordList = wordList;
        }
        // console.log(datas);
        idioms = datas;  //赋值给全局变量
        //隐藏所有成语
        for (let i = 0; i < this.idiom.children.length; i++) {
            this.idiom.children[i].opacity = 0;
        }
        //显示本关的成语
        //在键盘上显示隐藏的文字
        for (let i = 0; i < datas.length; i++) {
            this.idiom.children[i].opacity = 255;
            this.setIdiomInIndex(datas[i].idiom, i);
        }
        this._registerClickEvent();
    },
    _registerClickEvent() {
        //给需要填空的格子添加监听事件
        // console.log()
        for (let i = 0; i < idioms.length; i++) {
            let item = this.idiom.children[i];
            item.on('touchstart', this._onTouchStart.bind(this, i), this);
        }
    },
    _onTouchStart(indexs) {
        index = indexs;
        // console.log(index);
    },

    //显示本关中的成语
    setIdiomInIndex(string, index) {
        let idioms = this.idiom.children[index].children[0];
        let idiom = idioms.getChildByName('Label').getComponent(cc.Label);
        idiom.string = string;
    },


    //显示弹窗
    show() {
        this.tanchuang.position = cc.v2(0, 0);
        // console.log(index);
        let top = this.tanchuang.getChildByName('top').getChildByName('right');//显示拼音的头部
        let expains = this.tanchuang.getChildByName('explain').getChildByName('bottom');//释义
        for (let i = 0; i < top.children.length; i++) {
            let pinyin = top.children[i].children[0].getComponent(cc.Label); //拼音
            let item = top.children[i].children[1].getComponent(cc.Label);  //字
            let explain = expains.children[0].getComponent(cc.Label);
            pinyin.string = idioms[index].wordList[i].pingyin;
            item.string = idioms[index].wordList[i].word;
            explain.string = idioms[index].explain;
        }
    },
    hide() {
        this.tanchuang.position = cc.v2(2000, 0);
    },
    // start () {},
    update(dt) {

    }
});
