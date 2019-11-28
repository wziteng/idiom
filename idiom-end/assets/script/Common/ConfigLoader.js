const ConfigLoader={
    //加载json文件
    loadJson(jsonData,callback){
            //let jsonData=resp.json;
            console.log(jsonData);
            if (callback){
                callback(jsonData);//通过callback将解析好的json数据返回出来
            }

    },



};

module.exports=ConfigLoader;

