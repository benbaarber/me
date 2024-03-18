uniform vec3 target;
uniform float maxDistance;

out float proximity;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float dist = distance(modelPosition.xyz, target);
  proximity = 1.0 - smoothstep(0.0, maxDistance, dist);
  
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}