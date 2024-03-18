uniform vec3 ambientLightColor; // Ambient light color
uniform vec3 lightColor; // Light color
uniform vec3 lightPosition; // Light position in world space

varying float vIsEdge; // 1 for edge vertices, 0 for face vertices
varying vec3 vNormal; // The normal passed from the vertex shader
varying vec3 vViewPosition; // The view position passed from the vertex shader
varying vec4 vWorldPosition; // The world position passed from the vertex shader

void main() {
  if (vIsEdge < 0.5) {
    // Normalize the normal and view direction
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    vec3 lightDir = normalize(lightPosition - vWorldPosition.xyz);

    // Calculate the ambient component
    vec3 ambient = ambientLightColor;

    // Calculate the diffuse component
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;

    // Calculate the specular component
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 16.0); // Specular exponent can be adjusted
    vec3 specular = spec * lightColor;

    // Combine the lighting components
    vec4 color = vec4(ambient + diffuse + specular, 0.5); // 0.5 is the alpha for semi-transparency

    // Output the final color
    gl_FragColor = color;
  } else {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
}
