var GameState = {
  StartAnim: 1,
  Playing: 2,
  Moving: 3,
  End: 4,
};

cc.Class({
    extends: cc.Component,

    properties: {
        fire: cc.Sprite,
        light1: cc.Sprite,
        light2: cc.Sprite,
        light3: cc.Sprite,
        blackMask: cc.Sprite,
        tip: cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        this.fireNode = this.fire.node;
        this.fireNode.zIndex = 3;
        this.lightList = [];
        this.lightList[1] = this.light1;
        this.lightList[2] = this.light2;
        this.lightList[3] = this.light3;
        this.startAction();
        this.registerTouch();
        //console.log('this.fire = ' + this.fire);
    },

    registerTouch:function(){
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if(self.curState != GameState.Playing){
                return;
            }
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.isMoving = true;
            var arPos = self.fireNode.convertToNodeSpaceAR(touchLoc);
            var distance = arPos.x*arPos.x + arPos.y*arPos.y;
            if(distance < 2500){
                self.curState = GameState.Moving;
            }
        }, self.node);
        self.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if(self.curState != GameState.Moving){
                return;
            }
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            var arPos = self.fireNode.getParent().convertToNodeSpaceAR(touchLoc);
            self.fireNode.setPosition(arPos);
        }, self.node);
        self.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if(self.curState != GameState.Moving){
                return;
            }
            self.curState = GameState.End;
            var pos1 = self.fireNode.parent.convertToWorldSpaceAR(self.fireNode.getPosition());
            var moveDis = pos1.y + 200;
            var speed = 600;
            var moveBy = cc.moveBy(moveDis/speed, cc.v2(0, -moveDis));
            self.fireNode.runAction(
                cc.sequence(
                    moveBy,
                    cc.callFunc(() => {
                        self.showTips("Lose");
                        self.reStart();
                    })
                ));
        }, self.node);
    },

    startAction:function(){
        this.checkList = [1,2,3];
        this.curState = GameState.StartAnim;
        this.lightNum = 0;
        var self = this;
        this.tip.node.active = false;
        var maskNode = this.blackMask.node;
        var fadeAction = cc.fadeIn(2);
        maskNode.opacity = 0;
        maskNode.runAction(
            cc.sequence(
                fadeAction,
                cc.callFunc(() => {
                    self.curState = GameState.Playing;
                    self.showTips('start');
                })
            )
        );
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
        for (var i = 1; i<4; i++)
        {
            var light = this.lightList[i];
            var lightNode = light.node;
            lightNode.zIndex = 0;
        }
        this.startAction();
    },

    // called every frame
    update: function (dt) {
        if(this.curState != GameState.Moving){
            return;
        }
        var len = this.checkList.length;
        for (var i = 0; i<len; i++)
        {
            var index = this.checkList[i];
            var light = this.lightList[index];
            var lightNode = light.node;
            var firePos = this.fireNode.getParent().convertToNodeSpaceAR(this.fireNode.getPosition());
            var lightPos = lightNode.getParent().convertToNodeSpaceAR(lightNode.getPosition());
            var distance = (firePos.x-lightPos.x)*(firePos.x-lightPos.x) + (firePos.y-lightPos.y)*(firePos.y-lightPos.y);
            if(distance < 5000){
                console.log("distance6666 = "+distance);
                this.checkList.splice(i,1);
                lightNode.zIndex = 2;
                break;
            }
        }
        var len = this.checkList.length;
        if(len == 0){
            this.curState = GameState.End;
            this.showTips('Win');
            var self = this;
            var timer = setTimeout(function(){
                self.reStart();
            }, 2000);
            
        }
    },
});
