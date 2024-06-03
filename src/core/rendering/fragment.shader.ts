export const FRAGMENT_SHADER = `
#version 330 core

// Interpolated color from the vertex shader
in vec3 fragColor;

// Output color
out vec4 outColor;

void main()
{
    // Set the fragment color
    outColor = vec4(fragColor, 1.0); // The alpha is set to 1.0 (opaque)
}`;
