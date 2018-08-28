cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
    	cc.director.getCollisionManager().enabled = true;
       	//cc.director.getCollisionManager().enabledDebugDraw = true;
       	this.fireNode = this.node;
       	this.registerTouch();
    },

    // called every frame
    update: function (dt) {

    },

    registerTouch:function(){
        var self = this;
        var gameManager = ck.GameManager.getInstance();
        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if(gameManager.getCurState() != ck.GameState.Playing){
                return;
            }
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            var arPos = self.fireNode.convertToNodeSpaceAR(touchLoc);
            var distance = arPos.x*arPos.x + arPos.y*arPos.y;
            if(distance < 2500){
            	gameManager.changeState(ck.GameState.Moving);
            }
        }, self.node);
        self.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if(gameManager.getCurState() != ck.GameState.Moving){
                return;
            }
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            var arPos = self.fireNode.getParent().convertToNodeSpaceAR(touchLoc);
            self.fireNode.setPosition(arPos);
        }, self.node);
        self.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if(gameManager.getCurState() != ck.GameState.Moving){
                return;
            }
            gameManager.fail()
        }, self.node);
    },

    onCollisionEnter: function (other) {
        cc.log("fire onCollisionEnter "+other.node.name);
    },

    onCollisionStay: function (other) {
        // console.log('on collision stay');
    },

    onCollisionExit: function () {
    }
});
