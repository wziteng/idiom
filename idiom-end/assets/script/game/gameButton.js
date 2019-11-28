cc.Class({
    extends: cc.Component,

    properties: {
        home:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene('main');
    },

    start () {
        this.home.on('click',function () {
            cc.director.loadScene('main');
        },this)
    },

    // update (dt) {},
});
