let loadImag=require('loadimgs');
let global = require('Global');
const PERSON = {
    PERSON_1:0,
    PERSON_2:1,   //隐藏
  };
cc.Class({
    extends: cc.Component,
    properties: {
        match:cc.Prefab, 
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad(){
        global.globalSocket = io.connect('wss://game.i--j.com:3002');//wss://game.i--j.com:3002
        global.hallSocket = io.connect('wss://game.i--j.com:3002/hall',{'force new connection': true});
        console.log('')

    },
    
    //初始化图片精灵
    initSprite(){
        let sprites=[];
        this.house_Bg=cc.find('Canvas/main/house/home/Background').getComponent(cc.Sprite);
        this.xiu_tou=cc.find('Canvas/main/person/ren_tou/Background').getComponent(cc.Sprite);
        this.xiu_shen=cc.find('Canvas/main/person/ren_shen/Background').getComponent(cc.Sprite);
        this.tiaozhan_Bg=cc.find('Canvas/tiaozhan/bg_gradient_mask').getComponent(cc.Sprite);
        this.gongming_Bg=cc.find('Canvas/gongming/bg_gradient_mask').getComponent(cc.Sprite);
        this.jingli_Bg=cc.find('Canvas/jingli/bg_gradient_mask').getComponent(cc.Sprite);
        this.setting_Bg=cc.find('Canvas/setting/bg_gradient_mask').getComponent(cc.Sprite);
        sprites.push(this.house_Bg,this.xiu_tou,this.xiu_shen,this.tiaozhan_Bg,this.gongming_Bg,this.jingli_Bg,this.setting_Bg);
        let paths=['home','person','person','bg','bg','bg','bg'];
        let names=['fang2','xiu_tou','xiu_shen','bg_gradient_mask','bg_gradient_mask','bg_gradient_mask','bg_gradient_mask'];
        for(let i=0;i<paths.length;i++){
            loadImag.loadImages(paths[i],names[i],sprites[i]);
        }

    },

    start () {
        this.initSprite();
    },

    newPrefab(){
        let item=cc.instantiate(this.match);
        item.parent=cc.find('Canvas');
        item.setPosition(0,0);
        global.prename=item;
        global.hallSocket.disconnect();
        
    }

});
