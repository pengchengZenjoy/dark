const math = cc.vmath;
const renderEngine = cc.renderer.renderEngine;
const renderer = renderEngine.renderer;
const gfx = renderEngine.gfx;
const Material = renderEngine.Material;

// Require to load the shader to program lib
require('MaskShader');

function MaskMaterial () {
    Material.call(this, false);

    var pass = new renderer.Pass('maskLight');
    pass.setDepth(false, false);
    pass.setCullMode(gfx.CULL_NONE);
    pass.setBlend(
        gfx.BLEND_FUNC_ADD,
        gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA,
        gfx.BLEND_FUNC_ADD,
        gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA
    );

    let mainTech = new renderer.Technique(
        ['transparent'],
        [
            { name: 'mouse', type: renderer.PARAM_FLOAT2 },
        ],
        [
            pass
        ]
    );

    this._texture = null;
    this._mouse = math.vec2.create();

    // need _effect to calculate hash
    this._effect = this.effect = new renderer.Effect(
        [
            mainTech,
        ],
        {
            'mouse': this._mouse
        },
        [
        ]
    );

    this._mainTech = mainTech;
}
cc.js.extend(MaskMaterial, Material);
cc.js.mixin(MaskMaterial.prototype, {
    getTexture () {
        return this._texture;
    },

    setTexture (val) {
        if (this._texture !== val) {
            this._texture = val;
            this._texture.update({
                // Adapt to shader
                flipY: true,
                // For load texture
                mipmap: true
            });
        }
    },

    setMouse () {
        var fire = ck.GameManager.getInstance().getFire();
        if(fire) {
            var pos = fire.parent.convertToWorldSpaceAR(fire.getPosition());
            this._mouse.x = pos.x;
            this._mouse.y = pos.y;
            this.effect.setProperty('mouse', this._mouse);
        }
    },
});

module.exports = MaskMaterial;