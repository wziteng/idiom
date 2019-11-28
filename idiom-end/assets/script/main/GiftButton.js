cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.ScrollView,
        totalCount: 0,
        vigor: cc.Prefab,  //精力预制体

    },

    onLoad: function () {
        this.init()
    },

    init() {
        this.vigors = []

        for (let index = 0; index < this.totalCount; index++) {
            let vigor = this.addVigor()
            this.vigors.push(vigor)
        }
    },
    addVigor() {
        let vigor = cc.instantiate(this.vigor)
        this.scrollView.content.addChild(vigor)
        return vigor
    },
    show() {
        this.node.active = true;
        this.node.emit('fade-in')

    },
    hide() {
        this.node.emit('fade-out')
    },

    start () {

    },
    // update (dt) {},
});
