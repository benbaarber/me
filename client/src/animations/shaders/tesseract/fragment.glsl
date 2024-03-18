uniform vec3 ambientLightColor;
uniform vec3 lightColor;
uniform vec3 lightPosition;

in float vIsEdge;
in vec3 vNormal;
in vec3 vViewPosition;
in vec4 vWorldPosition;

void main() {
  if (vIsEdge < 0.5) {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    vec3 lightDir = normalize(lightPosition - vWorldPosition.xyz);

    vec3 ambient = ambientLightColor;

    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;

    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 16.0);
    vec3 specular = spec * lightColor;

    vec4 color = vec4(ambient + diffuse + specular, 0.5);

    gl_FragColor = color;
  } else {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
}
