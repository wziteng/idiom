cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
    },

    show(){
        this.node.active = true ;
        this.node.emit("fade-in");
    },
    hide(){
        this.node.emit("fade-out");
    },
    start () {

    },

    // update (dt) {},
});
