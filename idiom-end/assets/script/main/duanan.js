let global=require('Global');
cc.Class({
    extends: cc.Component,

    properties: {
        pressedScaler: 1.2,
        transDuration: 0.1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        let scaleDownAction = cc.scaleTo(0.1, 0.8);
        function onTouchDown(event) {
            this.stopAllActions();
            this.runAction(scaleDownAction);
            global.sendHttpPost_times(global.openid);
            global.sendHttpPost_duan(()=>{
                cc.director.loadScene("every_duan"); //切换场景
            });


        }

        this.node.on('touchstart', onTouchDown, this.node);
    },


    start () {

    },
    // update (dt) {},
});
