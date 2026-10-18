# TechText — Built from Scratch

This branch is a clean workspace for building an interactive tech-style wordmark from first principles.

## Goal

Create an animated name wordmark for the portfolio hero using React and plain CSS/JavaScript. The implementation should be understood and built in small, verifiable steps rather than copied as a complete component.

## Build sequence

1. Render centered, responsive text.
2. Measure text and prepare a canvas drawing surface.
3. Draw the letters as solid shapes.
4. Reveal dashed letter outlines near the pointer.
5. Add specks and click interaction.
6. Handle resizing, touch devices, and reduced-motion preferences.

## Working rules

- Keep this branch minimal: initially, this README is the only file.
- Add source files only as we implement each step and understand why it is needed.
- Use the React and Vite setup already available in the main project; avoid unnecessary dependencies.
- Test each small change before adding the next behavior.

The goal is not just to reproduce an effect. It is to understand the rendering, geometry, interaction, and animation well enough to maintain and extend it independently.
