var gameManager = require("gameManager");

cc.Class({
    extends: cc.Component,

    properties: {
        fire: cc.Sprite,
        blackMask: cc.Sprite,
        tip: cc.Label,
    },

    onLoad: function () {
        ck.GameManager.getInstance().start();
    },

    startAction:function(){
    },

    showTips: function (word) {
        this.tip.string = word;
        var tipNode = this.tip.node;
        tipNode.active = true;
        var fadeAction = cc.fadeOut(2);
        tipNode.opacity = 255;
        tipNode.stopAllActions();
        tipNode.runAction(
            cc.sequence(
                fadeAction,
                cc.callFunc(() => {
                    tipNode.active = false;
                })
            )
        );
    },

    reStart: function (dt) {
        this.fireNode.setPosition(-438, 27);
        var nodePath = 'Canvas';
        var canvas = cc.find(nodePath);
        var childrens = canvas.children;
        var length = childrens.length;
        for (var i = 0; i<length; i++)
        {
            var node = childrens[i];
            cc.log("childName = "+node.name);
            if(node.name.indexOf("light")>-1){
                node.zIndex = 0;
                var collider = node.getComponent(cc.BoxCollider);
                collider.enabled = true;
            }
        }
        this.startAction();
    },

    update: function (dt) {
    },
});
