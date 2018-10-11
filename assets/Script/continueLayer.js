var gameManager = require("gameManager");

cc.Class({
    extends: cc.Component,

    properties: {
        backBtn: {
            default: null,
            type: cc.Button
        },
        retryBtn: {
            default: null,
            type: cc.Button
        },
    },

    setIsWin: function (value) {
        this.isWin = value
        if(value){
            this.retryBtn.node.getChildByName("Label").getComponent(cc.Label).string="下一关";
        }else{
            this.retryBtn.node.getChildByName("Label").getComponent(cc.Label).string="重试";
        }
    },

    onLoad: function () {
        var self = this;
        this.backBtn.node.on(cc.Node.EventType.TOUCH_END, function (event) {
                ck.GameManager.getInstance().enterMainScene();
            });
        this.retryBtn.node.on(cc.Node.EventType.TOUCH_END, function (event) {
                if(self.isWin){
                    ck.GameManager.getInstance().enterNextFightScene();
                }else{
                    setTimeout(function(){
                        self.node.active = false;
                    }.bind(this), 10);
                    ck.GameManager.getInstance().reStart();
                }
            });
    },

    update: function (dt) {
    },
});
//cocos new pokerLua -p com.peter.org -l lua ./
