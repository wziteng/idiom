const loadImages={
    //从服务器加载图片
    loadImages(path,name,sprite){
        let self=this;
        let url="https://game.i--j.com/images/Texture/"+path+"/"+name+".png";
        cc.loader.load(url,function (err,texture) {
            sprite.spriteFrame=new cc.SpriteFrame(texture);
        })
    },

};
module.exports=loadImages;