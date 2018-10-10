cc.Class({
    extends: cc.Component,

    properties: {
        speed : 20,
        moveX: -100,
        moveY: -100,
    },

    // use this for initialization
    onLoad: function () {
    	cc.director.getCollisionManager().enabled = true;
        this.startPosX = this.node.getPosition().x
        this.startPosY = this.node.getPosition().y
        this.endPosX = this.startPosX + this.moveX
        this.endPosY = this.startPosY + this.moveY

        var moveTime = Math.sqrt(this.moveX*this.moveX + this.moveY*this.moveY)/this.speed
        var moveFirst = cc.moveTo(moveTime, cc.v2(this.endPosX, this.endPosY));
        var moveEnd = cc.moveTo(moveTime, cc.v2(this.startPosX, this.startPosY));
        
        this.node.runAction(
            cc.repeat(cc.sequence(
                moveFirst,
                moveEnd
            ),9999999));
       	//cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    // called every frame
    update: function (dt) {
         
    },

    onCollisionEnter: function (other) {
        cc.log("wall onCollisionEnter " +other.node.name);
        ck.GameManager.getInstance().collisionWall();
        this.node.zIndex = 2;
    },

    onCollisionStay: function (other) {
        // console.log('on collision stay');
    },

    onCollisionExit: function () {
    }
});
