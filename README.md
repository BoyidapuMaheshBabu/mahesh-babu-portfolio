# Portfolio — TechText From Scratch

This branch is a hands-on experiment for building a modern software-engineering portfolio interface and then implementing its animated name wordmark from first principles.

## Current stage

The first page foundation uses a near-black canvas, blue/cyan lighting, a subtle technical grid, circuit-style geometry, and a code panel. The hero introduces **Mahesh Babu — AI Software Engineer**.

The animated TechText effect is intentionally **not implemented yet**. We will build it step by step and understand the rendering and interaction logic before adding polish.

## Build sequence

1. Establish the responsive page and visual direction.
2. Render and measure the hero wordmark.
3. Draw text through the Canvas API.
4. Build the dashed-letter reveal interaction.
5. Add specks, click response, and pointer/touch handling.
6. Refine resizing, accessibility, and reduced-motion behavior.

## Run locally

Requirements: Node.js, npm, and Git.

```bash
npm install
npm run dev
```

Run the production build:

```bash
npm run build
npm run preview
```

## Principles

- Keep the implementation understandable and incremental.
- Avoid importing the completed React Bits component.
- Use the existing React/Vite stack without adding unnecessary dependencies.

## Attribution

The `TechText` component is sourced from the [React Bits](https://reactbits.dev/) component library, which is maintained by David Haz ([@davidhaz](https://github.com/DavidHDev)).

- **Source:** https://reactbits.dev/r/TechText-JS-CSS.json
- **Repository:** https://github.com/DavidHDev/react-bits
- **License:** MIT + Commons Clause

> Free to use in personal and commercial applications.  
> The Commons Clause restriction prohibits selling, sublicensing, or redistributing the components as a standalone component library or template package.

The component source was copied verbatim from the official registry JSON (no modifications to behaviour). Only the `'use client'` directive was removed, as it is a Next.js/React Server Components convention not applicable to this Vite project.
