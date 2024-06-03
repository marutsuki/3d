export const VERTEX_SHADER = `
#version 330 core

// Input vertex data, different for all executions of this shader.
layout(location = 0) in vec3 inPosition; // Position of the vertex
layout(location = 1) in vec3 inColor;    // Color of the vertex

// Output data; will be interpolated for each fragment.
out vec3 fragColor; 

// Uniforms
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main()
{
    // Apply transformations: model, view, and projection
    gl_Position = projection * view * model * vec4(inPosition, 1.0);
    
    // Pass the color to the fragment shader
    fragColor = inColor;
}`;
