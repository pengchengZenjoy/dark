cc.Class({
    extends: cc.Component,

    properties: {
        speed : 1
    },

    // use this for initialization
    onLoad: function () {
    	cc.director.getCollisionManager().enabled = true;
       	//cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    // called every frame
    update: function (dt) {
        this.node.rotation = this.node.rotation + this.speed*dt;
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
