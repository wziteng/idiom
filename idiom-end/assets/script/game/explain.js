cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
        this._registerClickEvent();
    },
    _registerClickEvent(){
        console.log(this.node.children.length);
      for (let i = 0;i<this.node.children.length;i++){
              let item = this.node.children[i];
              item.on('touchstart',this._onTouchStart,this);
      }
    },
    _onTouchStart(event){
        let target = event.target;
        let label = target.getChildByName('New Label').getComponent(cc.Label);
        let bg = target.getChildByName('New Sprite').getComponent(cc.Sprite);
        let key = label.string;
        let gameModel = require("GameModel");
        gameModel.input(key);
    },
    // update (dt) {},

});
