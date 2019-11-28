const getRandomInt = function (min, max) {
    var ratio = Math.random();
    return min + Math.floor((max - min) * ratio);
};
cc.Class({
    extends: cc.Component,

    properties: {
        tubiaos: {
            default: [],
            type: cc.SpriteFrame
        },
        labels:{
            default:[],
            type:cc.String,
        },
        tubiao: cc.Sprite,
        label: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.refresh()
    },
    refresh() {
        // 图标
        let bgIndex = getRandomInt(0, this.tubiaos.length)
        this.tubiao.spriteFrame = this.tubiaos[bgIndex]
        //字数
        let labelIndex=getRandomInt(0,4)
        this.label.string =this.labels[labelIndex];
    },

    // update (dt) {},
});
