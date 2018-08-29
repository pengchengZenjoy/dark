var gameManager = require("gameManager");

cc.Class({
    extends: cc.Component,

    properties: {
        btnPrefab: {
            default: null,
            type: cc.Prefab
        },
    },

    onLoad: function () {
        var chapterNum = 2;
        var btnHeight = 40;
        var distance = 10
        var contentHeight = chapterNum*(btnHeight+distance)+distance;
        this.node.setContentSize(220, contentHeight);
        var self = this;
        for(var i = 1; i<=chapterNum;i++){
            var newBtn = cc.instantiate(this.btnPrefab);
            this.node.addChild(newBtn);
            newBtn.setPosition(0, btnHeight/2-i*(btnHeight+distance));
            var registerTouch = function(index){
                newBtn.on(cc.Node.EventType.TOUCH_END, function (event) {
                    self.touchBtn(index);
                });
            }
            registerTouch(i);
            var labelNode = newBtn.getChildByName("Label");
            var label = labelNode.getComponent(cc.Label);
            label.string = "第"+i.toString()+"关";
        }
    },

    touchBtn: function (index) {
        ck.GameManager.getInstance().enterFightScene(index);
    },

    update: function (dt) {
    },
});
