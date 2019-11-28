cc.Class({
    extends: cc.Component,

    properties: {
        jingli:cc.Sprite,
        liwu:cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.jumpLiwu();
        this.jumpJingli();
    },
    jumpJingli(){
        return this.jingli.node.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.rotateBy(0.5,30),
                    cc.rotateBy(0.5,-30)
                ))
        );
    },
    jumpLiwu(){
        return this.liwu.node.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.moveTo(0.5,0,4),
                    cc.moveTo(0.5,0,0)
                ))
        );
    },
    start () {

    },

    // update (dt) {},
});
