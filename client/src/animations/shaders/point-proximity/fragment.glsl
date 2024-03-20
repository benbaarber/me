in float proximity;

void main() {
  vec4 color = vec4(0.9, 0.9, 1.0, 1.0);
  gl_FragColor = vec4(color.rgb * proximity, color.a);
}