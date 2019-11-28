cc.Class({
    extends: cc.Component,

    properties: {
        ren:cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad: function () {
        this.ren.node.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.rotateBy(1,10),
                    cc.rotateBy(1,-10),
                    cc.rotateBy(1,-10),
                    cc.rotateBy(1,10),
                ))
        );
    },
    start () {

    },

    // update (dt) {},
});
