var MaskMaterial = require("MaskMaterial");
cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Sprite
    },

    // use this for initialization
    onLoad: function () {
    	cc.dynamicAtlasManager.enabled = false;
        this._material = new MaskMaterial();
    },

    start () {
        cc.log("MaskMaterial start")
        var mySprite = this.node.getComponent(cc.Sprite);
        let texture = mySprite.spriteFrame.getTexture();
        this._material.setTexture(texture);
        mySprite._material = this._material;
        mySprite._renderData._material = this._material;
        this._material.updateHash();
        /*if (this.target) {
            let texture = this.target.spriteFrame.getTexture();
            this._material.setTexture(texture);
            this.target._material = this._material;
            this.target._renderData._material = this._material;
            this._material.updateHash();
        }*/
    },

    // called every frame
    update: function (dt) {
        this._material.setMouse();
    },
});
