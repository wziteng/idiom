"use strict";
cc._RF.push(module, '42674ll44dFRLqw7twiFoyV', 'ConfigLoader');
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