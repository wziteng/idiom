// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        OK:cc.Node,
        home:cc.Node,
        bg1:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {
        this.bg1.getComponent(cc.Sprite);
        this.loadImage();
        this.OK.on('click',function(){
            console.log('aaaaa');
            cc.director.loadScene("main");
        },this);

        this.home.on('click',function(){
            console.log('ssssssss');
            cc.director.loadScene("main");
        },this);

    },
    loadImage(){
        let self=this;
        let url="https://game.i--j.com/images/Texture/bg/duanan.png";
        cc.loader.load(url,function (err,texture) {
            let sprite=new cc.SpriteFrame(texture);
            self.bg1.spriteFrame=sprite;
        })
    },


    // update (dt) {},
});
