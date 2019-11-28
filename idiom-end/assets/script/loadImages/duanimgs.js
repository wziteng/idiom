let loadImages=require('loadimgs');
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:
    onLoad(){
        this.initSprite();
    },

    initSprite(){
        let sprites=[];
        this.bg=cc.find('Canvas/bg').getComponent(cc.Sprite);
        this.p_M_body=cc.find('Canvas/bg/person_m/body').getComponent(cc.Sprite);
        this.p_M_head=cc.find('Canvas/bg/person_m/head').getComponent(cc.Sprite);
        this.p_W_body=cc.find('Canvas/bg/person_w/body').getComponent(cc.Sprite);
        this.p_W_head=cc.find('Canvas/bg/person_w/head').getComponent(cc.Sprite);
        this.Failure_Bg=cc.find('Canvas/Failure/stop_bg').getComponent(cc.Sprite);
        sprites.push(this.bg,this.p_M_body,this.p_M_head,this.p_W_body,this.p_W_head,this.Failure_Bg);
        console.log(sprites);
        let paths=['bg','person','person','person','person','bg'];
        let names=['duanan','nan_shen','nan_tou','nv_shen','nv_tou','singleColor'];
        for(let i=0;i<paths.length;i++){
            loadImages.loadImages(paths[i],names[i],sprites[i]);
        }
    },


    start () {
    
    },

    // update (dt) {},
});
