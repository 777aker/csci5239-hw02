#version 120

// model and light from vertex shader 
varying float LightIntensity;
varying vec3 ModelPos;

uniform float time;

uniform sampler2D tex;

void main() {
	// wow I'm bad at shaders, this took forever to figure out
	// really was just trying to figure out how to base on face not 
	// model position so every face could have same thing
	//float rb = length(gl_TexCoord[0].xy+ModelPos.xy-.5);
	float rb = length(gl_TexCoord[0].xy-.5);
	if(rb < .2)
		discard;
	else
		gl_FragColor = LightIntensity * texture2D(tex, gl_TexCoord[0].xy) * vec4(rb, 0, rb, 1);
}