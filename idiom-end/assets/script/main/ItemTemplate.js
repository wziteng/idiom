cc.Class({
    extends: cc.Component,
    properties: {
        Name: cc.Label,
        leaves: cc.Label,
        icon: cc.Sprite,
    },
    // onLoad () {},
    init: function (dates) {
        let self = this;
        self.Name.string = dates.Name;
        self.leaves.string = "完成第"+dates.leaves+"关";
        if (dates.leaves===dates.guan){
            self.icon.spriteFrame = dates.nSF;
        }
        if (dates.leaves<dates.guan){
            self.icon.spriteFrame = dates.lSF;
        }
        if (dates.leaves>dates.guan){
            self.icon.spriteFrame = dates.sSF;
        }
    },

    start () {

    },

    // update (dt) {},
});
