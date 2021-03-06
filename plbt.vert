#version 120

// phong lighting from ex03 for discarding texture
float phong() {
   //  P is the vertex coordinate on body
   vec3 P = vec3(gl_ModelViewMatrix * gl_Vertex);
   //  N is the object normal at P
   vec3 N = normalize(gl_NormalMatrix * gl_Normal);
   //  Light Position for light 0
   vec3 LightPos = vec3(gl_LightSource[0].position);
   //  L is the light vector
   vec3 L = normalize(LightPos - P);
   //  R is the reflected light vector R = 2(L.N)N - L
   vec3 R = reflect(-L, N);
   //  V is the view vector (eye at the origin)
   vec3 V = normalize(-P);

   //  Diffuse light intensity is cosine of light and normal vectors
   float Id = max(dot(L,N) , 0.0);
   //  Shininess intensity is cosine of light and reflection vectors to a power
   float Is = (Id>0.0) ? pow(max(dot(R,V) , 0.0) , gl_FrontMaterial.shininess) : 0.0;

   //  Vertex color (ignores emission and global ambient)
   vec3 color = gl_FrontLightProduct[0].ambient.rgb
           + Id*gl_FrontLightProduct[0].diffuse.rgb
           + Is*gl_FrontLightProduct[0].specular.rgb;

   //  Vertex intensity
   return length(color);
}

// light of intensity and model position for frag shader
varying float LightIntensity;
varying vec3 ModelPos;

// location changing stuff and zooming ability
uniform vec3 loc;

void main() {
    // scalar light intensity for frag shader 
    LightIntensity = phong();
    // texture
    gl_TexCoord[0] = gl_MultiTexCoord0;
    // model coords for frag shader 
    // z is still scale but also added the z position
    // added 1 so z = 0 is center of cube not one edge
    ModelPos = loc.z * gl_Vertex.xyz - loc.xyz;
    ModelPos.z += 1;
    // do the point
    gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}