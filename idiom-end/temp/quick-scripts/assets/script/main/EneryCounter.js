(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/main/EneryCounter.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8a744/OY4xBUIXQtTNrqwlo', 'EneryCounter', __filename);
// script/main/EneryCounter.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        leftTimeLable: cc.Label,
        jingliLabel: cc.Label,
        totalTime: 10,
        currentTime: 0,
        jingli: 0

    },

    // onLoad () {},

    start: function start() {},
    update: function update(dt) {
        this.currentTime += dt;
        var leftTime = this.totalTime - Math.floor(this.currentTime);
        leftTime = leftTime >= 10 ? leftTime : "0" + leftTime;
        this.leftTimeLable.string = "00:" + leftTime;
        if (this.currentTime >= this.totalTime) {
            this.currentTime = 0;
            this.jingli += 1;
            if (this.jingli >= 5) {
                this.currentTime = this.totalTime + 1;
                this.jingliLabel.string = 5;
                //这里屏蔽掉时间记时，label换掉
                this.leftTimeLable.string = "已满";
            } else {
                this.jingliLabel.string = this.jingli;
            }
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=EneryCounter.js.map
        