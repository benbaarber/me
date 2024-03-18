uniform vec3 target;
uniform float maxDistance;
varying float proximity;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float distance = distance(modelPosition.xyz, target);
  proximity = 1.0 - smoothstep(0.0, maxDistance, distance);
  
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}