let global=require('Global');
const Constants = require('Constants');
const STAND = Constants.STAND;
cc.Class({
    extends: cc.Component,

    properties: {
     rankTop:cc.Node,
    },

    // onLoad () {},
    goHome(){
        global.JSONData.splice(0,global.JSONData.length);
        global.win='你赢了';
         global.roomSocket.disconnect();
         cc.director.loadScene("main"); //切换场景
    },
    Rank(){
        this.rankTop.active=true;
        sdk.postMessage({scene:'showTop3'});
    },
    hide(){
        this.rankTop.active=false;
        sdk.postMessage({scene:'hide'});
    },
    start () {
        
    },

    // update (dt) {},
});
