#version 120

// model and light from vertex shader
varying float LightIntensity;
varying vec3 ModelPos;

uniform float time;

uniform sampler2D tex;

void main() {
	// build our noise 
	// add time to the y so we get the snow falling effect
	float noise = fract(sin(dot(floor((gl_TexCoord[0].xy+vec2(0,time*.25))*10), vec2(12.9898, 78.233))) * 43758.5453);
	// clamp it so it looks cool
	noise = clamp(step(.8, noise) * (ModelPos.y+1), 0, 1)*5;
	// construct our base color + the snow
	vec4 color = vec4(noise+.2, noise+.2, noise+.4, 1);
	// make the color fade as you go down
	color *= ModelPos.y+1;
	// make the top a cloud
	color += step(1-ModelPos.y, .2)*4;
	// make the snow build up on the ground
	if(gl_TexCoord[0].y < .5)
		color += step((1-abs(ModelPos.y)*time*.25), .2)*4;
	// make the bottom invisible because it's dark and otherwise bottom face looks silly
	color *= step(-ModelPos.y-.8, 0);
	// actually do our stuff
	gl_FragColor = LightIntensity * color;
}