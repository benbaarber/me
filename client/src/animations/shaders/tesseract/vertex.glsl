uniform float time;

in float wComponent;

void main() {
  float c = cos(time);
  float s = sin(time);

  mat4 xwRotationMatrix = mat4(vec4(c, 0.0, 0.0, s), vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0), vec4(-s, 0.0, 0.0, c));
  vec4 rotatedPosition = xwRotationMatrix * vec4(position.x, position.y, position.z, wComponent);
  vec3 projectedPosition = rotatedPosition.xyz * (rotatedPosition.w / 2.0 + 1.5);

  vec4 worldPosition = modelMatrix * vec4(projectedPosition, 1.0);
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
