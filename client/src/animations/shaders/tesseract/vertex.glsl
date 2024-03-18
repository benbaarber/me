uniform float time; // Uniform to control the rotation over time

attribute float wComponent; // 4th dimension component
attribute float isEdge; // 1 for edge vertices, 0 for face vertices
varying vec3 vNormal; // To pass the normal to the fragment shader
varying vec3 vViewPosition; // To calculate the view direction in the fragment shader
varying vec4 vWorldPosition; // To pass the world position to the fragment shader
varying float vIsEdge;

void main() {
    // Calculate the angle of rotation based on time
  float c = cos(time);
  float s = sin(time);

    // Construct rotation matrix
  mat4 rotationMatrix = mat4(vec4(c, 0.0, 0.0, s), vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0), vec4(-s, 0.0, 0.0, c));

    // Rotate in 4D around the xw plane using the rotation matrix
  vec4 rotatedPosition = rotationMatrix * vec4(position.x, position.y, position.z, wComponent);

    // Simple 4D to 3D projection by dropping the w component
  vec3 projectedPosition = rotatedPosition.xyz * (rotatedPosition.w / 2.0 + 1.5);

    // Convert the position to world space for lighting calculations
  vWorldPosition = modelMatrix * vec4(projectedPosition, 1.0);

    // Apply the model view matrix and projection matrix as usual
  gl_Position = projectionMatrix * viewMatrix * vWorldPosition;

    // Pass the normal to the fragment shader
  vNormal = normalMatrix * normal;

    // Pass isEdge flag to the fragment shader
  vIsEdge = isEdge;

    // Calculate the view position for the fragment shader
  vViewPosition = -vec3(viewMatrix * vWorldPosition);
}
