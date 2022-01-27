#version 120

// model and light from vertex shader 
varying float LightIntensity;
varying vec3 ModelPos;

uniform float time;

void main() {
	float rb = abs(ModelPos.x)*abs(ModelPos.y)*abs(ModelPos.z);
	if(rb < .01)
		discard;
	else if(rb < 0.1)
		gl_FragColor = LightIntensity * vec4(.7-rb, .7-rb, .7-rb, 1);
	else
		gl_FragColor = LightIntensity * vec4(rb, 0, rb, 1);
}