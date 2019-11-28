(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Common/ConfigLoader.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '42674ll44dFRLqw7twiFoyV', 'ConfigLoader', __filename);
// script/Common/ConfigLoader.js

"use strict";

var ConfigLoader = {
    //加载json文件
    loadJson: function loadJson(jsonData, callback) {
        //let jsonData=resp.json;
        console.log(jsonData);
        if (callback) {
            callback(jsonData); //通过callback将解析好的json数据返回出来
        }
    }
};

module.exports = ConfigLoader;

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
        //# sourceMappingURL=ConfigLoader.js.map
        