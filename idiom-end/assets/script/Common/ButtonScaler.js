cc.Class({
    extends: cc.Component,

    properties: {
        pressedScaler: 1,
        transDuration: 0.2,

    },
    onLoad: function () {
        var self = this;
        let initScale = this.node.scale;
        let scaleDownAction = cc.scaleTo(self.transDuration, this.pressedScale);
        let scaleUpAction = cc.scaleTo(self.transDuration, initScale);

        function onTouchDown(event) {
            this.stopAllActions();
            this.runAction(scaleDownAction);
        }

        function onTouchUp(event) {
            this.stopAllActions();
            this.runAction(scaleUpAction);
        }

        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    },

    start () {

    },

    // update (dt) {},
});
