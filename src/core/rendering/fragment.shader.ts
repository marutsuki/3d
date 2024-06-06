export const FRAGMENT_SHADER = `#version 300 es

precision highp float;

in vec3 fragColor;

out vec4 outColor;

void main()
{
    // Set the fragment color
    outColor = vec4(fragColor.x, fragColor.y, fragColor.z, 1);
}`;
