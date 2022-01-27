#version 120

uniform sampler2D tex;
uniform float time;

void main() {
	// discard pizel if texture color length is less than 1.4
	// roughly gets rid of the pi symbol
	if(length(texture2D(tex, gl_TexCoord[0].xy)) < 1.4)
		discard;
	else
		gl_FragColor = gl_Color * texture2D(tex, gl_TexCoord[0].xy);
}