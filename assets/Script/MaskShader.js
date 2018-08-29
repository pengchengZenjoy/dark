let shader = {
    name: 'maskLight',

    defines: [
    ],
    vert:
        `
uniform mat4 viewProj;
uniform mat4 model;
attribute vec3 a_position;
attribute vec2 a_uv0;
varying vec2 uv0;
varying vec2 posNow;

void main () {
    mat4 mvp;
    mvp = viewProj * model;

    vec4 pos = mvp * vec4(a_position, 1);
    gl_Position = pos;
    uv0 = a_uv0;
    posNow = vec2(a_position.x, a_position.y);
}
`,
    frag:
        `
uniform vec2 mouse;
varying vec2 uv0;
varying vec2 posNow;

void main()
{
    float dis = length(posNow - mouse);
    float a = 1.;
    if(dis < 100.) a = 0.;
    if(dis > 100. && dis < 200.) a = (dis-100.)/100.;
    gl_FragColor = vec4(0.,0.,0., a);
}
`,

};

cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
    cc.renderer._forward._programLib.define(shader.name, shader.vert, shader.frag, shader.defines);
});

module.exports = shader;