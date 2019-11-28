cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    show(){
        this.node.active = true ;
        this.node.emit("fade-in");
    },
    hide(){
        // this.node.active = false ;
        this.node.emit("fade-out");
    },

    // update (dt) {},
});
