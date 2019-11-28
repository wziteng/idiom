let global = require('Global');
cc.Class({
    extends: cc.Component,

    properties: {
        pressedScaler: 1.2,
        transDuration: 0.1,
    
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        let scaleDownAction = cc.scaleTo(0.1, 0.8);
        let self = this;
        function onTouchDown(event) {
            this.stopAllActions();
            this.runAction(scaleDownAction);
            // global.sendHttpPost(() => {
            //         cc.director.loadScene("tiaozhan");
            //         console.log('hahaahhaah');
            // });
        }
        this.node.on('touchstart', onTouchDown, this.node);
    },


    start() {

    },
    // update (dt) {},
});
