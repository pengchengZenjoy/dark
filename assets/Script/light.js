cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
    	cc.director.getCollisionManager().enabled = true;
       	//cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    // called every frame
    update: function (dt) {

    },

    onCollisionEnter: function (other) {
        cc.log("light onCollisionEnter "+other.node.name);
        var collider = this.node.getComponent(cc.BoxCollider);
        collider.enabled = false;
        ck.GameManager.getInstance().collisionLight();
        this.node.zIndex = 2;
    },

    onCollisionStay: function (other) {
        // console.log('on collision stay');
    },

    onCollisionExit: function () {
    }
});
