cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('Back',function () {
            cc.director.loadScene('main');
        })
    },

    Back(event,data){
       this.node.emit('Back');
    },

    OK(event,data){
        this.node.emit('Back');
    },

    start () {}


    // update (dt) {},
});
