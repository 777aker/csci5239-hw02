#version 120

// model and light from vertex shader
varying float LightIntensity;
varying vec3 ModelPos;

uniform float time;

uniform sampler2D tex;

void main() {
	// random noisy texture nonsense
	float noise = fract(sin(dot(time + floor(gl_TexCoord[0].xy*10), vec2(12.9898, 78.233))) * 43758.5453);
	gl_FragColor = LightIntensity * vec4(noise, 0, .8, 1);
}