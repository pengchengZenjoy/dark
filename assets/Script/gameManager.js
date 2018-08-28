var GameState = {
  StartAnim: 1,
  Playing: 2,
  Moving: 3,
  End: 4,
};

var GameManager = function() {
}

GameManager.prototype.start = function() {
    var self = this;
    this._initNode();
    this.lightNum = 0;
    this.curState = ck.GameState.StartAnim;
    this.tip.active = false;
    var blackMask = this.blackMask;
    var fadeAction = cc.fadeIn(2);
    blackMask.opacity = 0;
    blackMask.runAction(
        cc.sequence(
            fadeAction,
            cc.callFunc(() => {
                blackMask.opacity = 0;
                self.curState = ck.GameState.Playing;
                self.showTips('start');
            })
        )
    );
}

GameManager.prototype.reStart = function() {
    this.fire.setPosition(-438, 27);
    var lightList = this.lightList;
    var length = lightList.length;
    for (var i = 0; i<length; i++)
    {
        var node = lightList[i];
        node.zIndex = 0;
        var collider = node.getComponent(cc.BoxCollider);
        collider.enabled = true;
    }
    var wallList = this.wallList;
    var length = wallList.length;
    for (var i = 0; i<length; i++)
    {
        var node = wallList[i];
        node.zIndex = 0;
        var collider = node.getComponent(cc.BoxCollider);
        collider.enabled = true;
    }
    this.start();
}

GameManager.prototype.collisionWall = function() {
    console.log('GameManager collisionWall');
    if(this.curState != ck.GameState.Moving){
        return;
    }
    this.fail();
}

GameManager.prototype.collisionLight = function() {
    console.log('GameManager collisionLight');
    this.lightNum = this.lightNum + 1;
    if(this.lightNum == 3){
        this.win();
    }else{
        this.showTips("点亮"+this.lightNum+"盏灯");
    }
}

GameManager.prototype.getCurState = function() {
    return this.curState;
}

GameManager.prototype._initNode = function() {
    if(this.fire){
        return;
    }
    var canvas = cc.find('Canvas');
    var childrens = canvas.children;
    var length = childrens.length;
    this.lightList = [];
    this.wallList = [];
    for (var i = 0; i<length; i++)
    {
        var node = childrens[i];
        if(node.name.indexOf("light")>-1){
            this.lightList.push(node);
        }
        if(node.name.indexOf("wall")>-1){
            this.wallList.push(node);
        }
        if(node.name.indexOf("fire")>-1){
            this.fire = node;
        }
        if(node.name.indexOf("fire")>-1){
            this.fire = node;
        }
        if(node.name.indexOf("mask")>-1){
            this.blackMask = node;
        }
        if(node.name.indexOf("tip")>-1){
            this.tip = node;
        }
    }
}

GameManager.prototype.changeState = function(newState) {
    this.curState = newState;
}

GameManager.prototype.showTips = function(word) {
    cc.log("showTips = "+word)
    this.tip.string = word;
    var label = this.tip.getComponent(cc.Label);
    label.string = word;
    var tip = this.tip;
    tip.active = true;
    var fadeAction = cc.fadeOut(2);
    tip.opacity = 255;
    tip.stopAllActions();
    tip.runAction(
        cc.sequence(
            fadeAction,
            cc.callFunc(() => {
                tip.active = false;
            })
        )
    );
}

GameManager.prototype.win = function() {
    this.curState = ck.GameState.End;
    this.showTips("Wins");
    setTimeout(function(){
        this.reStart();
    }.bind(this), 2000);
}

GameManager.prototype.fail = function() {
    var self = this;
    self.curState = ck.GameState.End;
    var pos1 = self.fire.parent.convertToWorldSpaceAR(self.fire.getPosition());
    var moveDis = pos1.y + 200;
    var speed = 600;
    var moveBy = cc.moveBy(moveDis/speed, cc.v2(0, -moveDis));
    self.showTips("Lose");
    self.fire.runAction(
        cc.sequence(
            moveBy,
            cc.callFunc(() => {
                self.reStart();
            })
        ));
}

GameManager.getInstance = function(){
    if(GameManager._instance == null){
        GameManager._instance = new GameManager();
    }
    return GameManager._instance;
}

if(!window.ck){
    window.ck = {}
}

ck.GameManager = GameManager;
ck.GameState = GameState;
module.exports = GameManager;