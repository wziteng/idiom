let global=require('Global');
cc.Class({
    extends: cc.Component,

    properties: {
      tiemLabel:cc.Label,
      fenTime:0,
      miaoTime:0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        this.fenTime=0;
        this.miaoTime += dt;
        let miao =Math.floor(this.miaoTime);
        if(miao%60===0){
            this.fenTime=this.fenTime+1;
        }
        this.tiemLabel.string =this.fenTime+"分"+miao+"秒";
        global.time=this.tiemLabel.string;
        global.fen = this.fenTime;
        global.miao = miao;
    },
});
