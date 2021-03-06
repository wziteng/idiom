let golbal = require('Global');
cc.Class({
    extends: cc.Component,

    properties: {
        progressBar: {
            type: cc.Node,
            default: null,
        },
        is_loading: false,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let self = this;
        this.pro = this.progressBar.getComponent(cc.ProgressBar);
        this.pro.progress = 0;
        this.Over();
        this.ProBar();
        this.beginGame();

    },

    ProBar() {
        let self = this;
        this.node.on('probar', function () {
            self.schedule(self.callback, 0.7);
        })
    },

    callback() {
        let self = this;
        if (self.pro.progress < 1) {
            self.pro.progress = self.pro.progress + 0.1;
        } else {
            self.unschedule(self.callback);
        }
    },

    Over() {
        this.node.on('over', function () {
            cc.director.loadScene('main');
        })
    },

    getAuth() {
        let self=this;
        window.wx.login({
            success: function (res) {
                let code = res.code;
                golbal.sendCodePost(code, () => {
                    window.wx.getUserInfo({
                        success(res) {
                            console.log(res);
                            golbal.sendUserInfo(res, golbal.openid);//res:用户信息，openid：用户的openid
                            cc.director.preloadScene('main', () => {
                                console.log('加载完成！');
                                self.node.emit('over');
                            })
                        }
                    });
                });

            }
        });
    },


    beginGame() {
        let self = this;
        let sysInfo = window.wx.getSystemInfoSync();
        //获取微信界面大小
        let width = sysInfo.screenWidth;
        let height = sysInfo.screenHeight;
        window.wx.getSetting({
            success(res) {
                console.log(res.authSetting);
                if (res.authSetting["scope.userInfo"]) {
                    self.node.emit('probar');
                    self.getAuth();
                } else {
                    let button = window.wx.createUserInfoButton({
                        type: 'text',
                        text: '',
                        style: {
                            left: 0,
                            top: 0,
                            width: width,
                            height: height,
                            backgroundColor: '#00000000',//最后两位为透明度
                            color: '#ffffff',
                            fontSize: 20,
                            textAlign: "center",
                            lineHeight: height,
                        }
                    });
                    button.onTap((res) => {
                        if (res.userInfo) {
                            console.log('授权');
                            self.node.emit('probar');
                            self.getAuth();
                            button.destroy();

                        } else {
                            console.log("用户拒绝授权:", res);
                        }
                    });
                }
            }
        })
    },

    //update (dt) { },
});
