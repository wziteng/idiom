let global=require('Global');
const CELL_STATE = {
  DEFAULT:0,
  HIDE:1,   //隐藏
  UNCHOSE:2,  //被选中，红框
  UNFILL:3,   //填了格子变黄变黄
  WRONG:4,    //填错字变红
  RIGHT:5,   //正确字变白，格子变绿
};
let value = 0;
let gameOver = 0;
let chose =0
cc.Class({
    extends: cc.Component,
    properties: {
        item:cc.Node,
        content:cc.Node,
        guan:cc.Node,
},

    onLoad () {
        
    },

    start () {
        let self = this ;
        self.initBoard(global.JSONData);

    },

//键盘的注册事件
    _registerKeyEvent(){
        for (let i = 0;i<this.Hide.length;i++){
            let item = this.content.children[i];
            item.on('touchstart',this._onTouchKeyStarts.bind(this,i),this);
        }
    },
    _onTouchKeyStarts(index,event){
        this.hideIndex = index;
        let target = event.target;
        let label = target.getChildByName('New Label').getComponent(cc.Label);
        let key = label.string;
        let NewHide=[];
        for (let i = 0 ;i<this.Hide.length;i++){
            if (this.Hide[i].hideIndex===chose||this.Hide[i].hideIndex===value){
                console.log(key);
                console.log(this.Hide[i].word);
                if (key===this.Hide[i].word) {
                    this.setWordByIndexs(255,this.Hide[i].hideIndex);//显示字
                    if(chose){
                        //点击跳转
                    this.setBgStateByIndex(CELL_STATE.DEFAULT, chose);
                    this.setWordByIndex(key,chose);//替换字
                    this.Hide.splice(this.hideIndex,1,{word:null,hideIndex:null});
                    let item = this.item.children[chose].getComponent(cc.Button);
                    item.node.pauseSystemEvents(true);
                   //点击之后自动跳转
                   for(let j = 0;j<this.Hide.length;j++){
                       console.log(this.Hide[j].word);
                       if(this.Hide[j].word!==null){
                        NewHide.push(this.Hide[j]);
                       }
                   }
                    for(let i = 0;i<NewHide.length;i++){
                        if(i+1===NewHide.length){
                            chose = NewHide[i].hideIndex;
                        }else{
                            chose = NewHide[i+1].hideIndex;
                        } 
                    }
                    this.setBgStateByIndex(CELL_STATE.UNCHOSE, chose);
                    }else if(value&&value!==0){
                        //自动跳转
                        this.setWordByIndex(key,value);//替换字
                        this.setBgStateByIndex(CELL_STATE.DEFAULT, value);
                        let item = this.item.children[value].getComponent(cc.Button);
                        item.node.pauseSystemEvents(true);
                        if(i+1===this.Hide.length){
                            value = this.Hide[i].hideIndex;
                        }else{
                            value = this.Hide[i+1].hideIndex;
                        } 
                        this.setBgStateByIndex(CELL_STATE.UNCHOSE, value);
                    }
                    this.Hide.splice(this.hideIndex,1,{word:null,hideIndex:null});
                    gameOver =gameOver+1;
                    if(gameOver===this.Hide.length){
                        this.gameOver();
                    }
                    let items = this.content.children[index];//正确的字消失
                    items.active = false;
                    return;
                }else {
                    if(chose){
                        this.setWordByIndex(key,chose);
                        this.setWordByIndexs(255,this.Hide[i].hideIndex);
                        this.setBgStateByIndex(CELL_STATE.WRONG, chose);
                    }else{
                        this.setWordByIndex(key,value);
                        this.setWordByIndexs(255,this.Hide[i].hideIndex);
                        this.setBgStateByIndex(CELL_STATE.WRONG, value);
                    }
                }
            }
        }
    },

    //给格子注册监听事件
    _registerClickEvent(){
        //给需要填空的格子添加监听事件
        for (let i = 0;i<this.Hide.length;i++){
            let index = this.Hide[i].hideIndex;
            let item = this.item.children[index].getComponent(cc.Button);  //button
            item.node.on(cc.Node.EventType.TOUCH_START,this._onTouchStart.bind(this,index),this);
        }
    },
    _onTouchStart(index,event){
            if (chose || chose === 0) {
                this.setBgStateByIndex(CELL_STATE.DEFAULT, chose);
                this.sta = CELL_STATE.DEFAULT;
            }
            this.setBgStateByIndex(CELL_STATE.DEFAULT, value);
            chose = index;
             this.setBgStateByIndex(CELL_STATE.UNCHOSE, chose);
             value = 0;
            console.log(index);
            if ( this.sta===CELL_STATE.RIGHT){
                this.setWordByIndexs(255,index);
            } else {
                this.setWordByIndexs(0,index);  //撤销填上去的字
            }
    },
    //选者格子自动跳转
    macthGezi(index){
        this.value =index;
        this.setBgStateByIndex(CELL_STATE.UNCHOSE, index);
    },
    //初始化棋盘，显示所有成语
    initBoard(data){
        console.log(data);
        let jsons = data;
        for (let i = 0;i<jsons.length;i++){
            let idiom = jsons[i].idiom;
            let direction = jsons[i].direction;
            let index = jsons[i].index;
            let wordList = [];
            let idiomList = idiom.split('');
            let hideword = jsons[i].hideword;
            let hideList = [];
            let HideList = hideword.split('');
            for (let j = 0;j<idiomList.length;j++){
                //成语
                let wordData = {};
                let space = (direction === 1 ? 1 : 9) ;
                wordData.index = index + space*j;
                wordData.word = idiomList[j];
                let hideData = {};
                hideData.word = HideList[j];
                wordList.push(wordData);
                //缺少的字和成语中的字匹配就把这个字和坐标存储在hide list中
                if (wordList[j].word===HideList[j]){
                    hideData.hideIndex = wordList[j].index;
                    hideList.push(hideData);
                }
            }
            jsons[i].wordList = wordList;
            jsons[i].hideList = hideList;
        }

        //隐藏格子上的所有文字
        for ( let i = 0;i<this.item.children.length;i++){
            this.item.children[i].opacity = 0
        }
        //显示文字
        for (let i = 0; i < jsons.length;i++){
            for (let j =0;j<jsons[i].wordList.length;j++) {
                let wordData = jsons[i].wordList[j];
                this.item.children[wordData.index].opacity = 255;
                this.setWordByIndex(wordData.word, wordData.index);//显示的文字
                this.setBgStateByIndex(CELL_STATE.DEFAULT, wordData.index);
            }
        }
        //隐藏键盘上的所有文字
        for ( let i = 0;i<this.content.children.length;i++){
            this.content.children[i].opacity = 0;
        }
        //隐藏的文字存在一个数组中
        let hide=[];
        for (let i = 0; i < jsons.length;i++){
            for (let j =0;j<jsons[i].hideList.length;j++) {
                let hideWord = jsons[i].hideList[j];
                hide.push(hideWord);

            }
        }
        //在键盘上显示隐藏的文字
        for (let i =0;i<hide.length;i++) {
            this.content.children[i].opacity = 255;
            this.setKeyWordByIndex(hide[i].word, i);  //显示被隐藏的字到键盘上
            this.setHideWordByIndex(hide[i].word, hide[i].hideIndex);  //隐藏格子上的字
        }
        this.Hide = hide;
        this._registerClickEvent();
        this._registerKeyEvent();
        value = this.Hide[0].hideIndex;
        this.macthGezi(value);

        //显示关卡
        let checkpoint = this.guan.getComponent(cc.Label);
        checkpoint.string = "第"+ global.checkpoint+"关";

    },
    //初始化格子上和键盘上的文字
    setWordByIndex(string,index){
        let item = this.item.children[index].children[0];
        let label = item.getChildByName('Label').getComponent(cc.Label);
        label.string = string;
    },
    setKeyWordByIndex(string,index){
        let items = this.content.children[index];
        let item = items.getChildByName('New Label').getComponent(cc.Label);
        item.string = string;
    },
    //隐藏需要填的文字
    setHideWordByIndex(string,hideIndex){
        let hideItem = this.item.children[hideIndex].children[0];  //需要填的词index值
        let hideLabel = hideItem.getChildByName('Label').getComponent(cc.Label).node;
        hideLabel.opacity = 0;
        hideLabel.string = string;
    },
    //撤销填的字的方法
    setWordByIndexs(opacity,hideIndex){
        let hideItem = this.item.children[hideIndex].children[0];  //需要填的词index值
        let hideLabel = hideItem.getChildByName('Label').getComponent(cc.Label).node;
        hideLabel.opacity = opacity;

    },
    //设置背景的状态
    setBgStateByIndex(state,index){
        let item = this.item.children[index].children[0];
        let itemBg = item.getChildByName('New Sprite').getComponent(cc.Sprite).node;  //需要填的词index值
        let color;
        if(state === CELL_STATE.DEFAULT){
            color = new cc.Color().fromHEX("#CF9AF3");
        } else if (state === CELL_STATE.UNCHOSE){
            color =new cc.Color().fromHEX('#A095F6');  //选中
        } else if (state === CELL_STATE.WRONG){
            color =new cc.Color().fromHEX('#F84C53');   //错误
        }else if (state === CELL_STATE.RIGHT){
            color =new cc.Color().fromHEX('#44ECD8');   //正确
        }
        itemBg.color = color;
    },
    goHome(){
        global.JSONData.splice(0,global.JSONData.length);
        cc.director.loadScene("main"); //切换场景
    },
    // update (dt) {},
    gameOver(){
        cc.director.loadScene("gameOver"); //切换场景
         gameOver = 0;


    }
});
