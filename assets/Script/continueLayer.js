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

    onLoad: function () {
        var self = this;
        this.backBtn.node.on(cc.Node.EventType.TOUCH_END, function (event) {
                ck.GameManager.getInstance().enterMainScene();
            });
        this.retryBtn.node.on(cc.Node.EventType.TOUCH_END, function (event) {
                setTimeout(function(){
                    self.node.active = false;
                }.bind(this), 10);
                ck.GameManager.getInstance().reStart();
            });
    },

    update: function (dt) {
    },
});
