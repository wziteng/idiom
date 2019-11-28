cc.Class({
    extends: cc.Component,

    properties: {
        bt: {
            type: cc.Node,
            default: null
        },
        GameOverPrefab:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    start() {
        this.bt.on('click', function () {
            console.log('点击！！！');
            this.initGameOverPrefab();
        }, this);
    },

    initGameOverPrefab(){
        let item=cc.instantiate(this.GameOverPrefab);
        item.setPosition(0,0);
        this.node.addChild(item);
    }

    // update (dt) {},
});
