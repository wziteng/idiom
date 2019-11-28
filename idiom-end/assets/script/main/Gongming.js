cc.Class({
    extends: cc.Component,
    properties: {
        //官名背景色
        sSF: cc.SpriteFrame,  //之前灰色
        nSF: cc.SpriteFrame,  //之中黄色
        lSF: cc.SpriteFrame,  //之后蓝色
        scrollView:cc.ScrollView,
        gmPrafeb:cc.Prefab,
        titleLabel:cc.Label,
        gongming:{
            default: null,
            type: cc.JsonAsset
        },
    },

    onLoad () {
        let self = this;
        //自己的关卡
        let guan = 220;
        cc.loader.loadRes('./gongming.json', function (err, object) {
            if (err) {
                console.log(err);
                return;
            }
            let data = object.json;
            self.init();
            for (var i = 0; i < data.length; ++i) {
                var item = cc.instantiate(self.gmPrafeb);
                var dates = data[i];
                dates.sSF =  self.sSF;
                dates.nSF =  self.nSF;
                dates.lSF =  self.lSF;
                dates.guan = guan;
                self.scrollView.content.addChild(item);
                item.getComponent('ItemTemplate').init({
                    Name: dates.name,
                    leaves: dates.leaves,
                    sSF: dates.sSF,  //之前灰色
                    nSF: dates.nSF,  //之中黄色
                    lSF: dates.lSF,
                    guan:dates.guan,
                });
            }
        });
            this.gongmingLabel();
            this.homeLabel();
    },
    init() {
        this.mingzis = []

        for (let index = 0; index < this.totalCount; index++) {
            let mingzi = this.addHeroSlot()
            this.mingzis.push(mingzi)
        }
    },
    addHeroSlot() {
        let mingzi = cc.instantiate(this.gmPrafeb)
        this.scrollView.content.addChild(mingzi)
        return mingzi
    },

    gongmingLabel(){
            //点击人物或名字标签
            this.titleLabel.string = "考取功名";
    },
    homeLabel(){
        //点击房子
        this.titleLabel.string = "买房置地";
    },
    show(){
        this.node.active = true ;
        this.node.emit("fade-in");
    },
    hide(){
        // this.node.active = false ;
        this.node.emit("fade-out");
    },
    start () {

    },

    // update (dt) {},
});
