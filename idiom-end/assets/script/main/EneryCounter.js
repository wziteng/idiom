cc.Class({
    extends: cc.Component,

    properties: {
        leftTimeLable:cc.Label,
        jingliLabel:cc.Label,
        totalTime:10,
        currentTime:0,
        jingli:0

    },

    // onLoad () {},

    start () {
    },

    update (dt) {
        this.currentTime += dt;
        let leftTime = this.totalTime - Math.floor(this.currentTime);
        leftTime = leftTime>=10?leftTime:"0"+leftTime;
        this.leftTimeLable.string = "00:"+leftTime;
        if (this.currentTime>=this.totalTime){
            this.currentTime = 0 ;
            this.jingli+=1;
            if(this.jingli>=5){
                this.currentTime=this.totalTime+1;
                this.jingliLabel.string =5;
                //这里屏蔽掉时间记时，label换掉
                this.leftTimeLable.string = "已满";
            }else {
                this.jingliLabel.string =this.jingli;
            }
        }
    },
});
