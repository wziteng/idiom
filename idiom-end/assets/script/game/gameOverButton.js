let global=require('Global');
cc.Class({
    extends: cc.Component,

    properties: {
     
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    goHome(){
        global.JSONData.splice(0,global.JSONData.length);
        cc.director.loadScene("main"); //切换场景
    },
    nextGame(){
        global.checkpoint=global.checkpoint+1;
        global.JSONData.splice(0,global.JSONData.length);
        console.log("下一关");
        global.sendHttpPost(()=>{
            cc.director.loadScene("game");
        });
    },
    start () {
        
    },

    // update (dt) {},
});
