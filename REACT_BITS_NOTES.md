# React Bits integration notes

This portfolio migration uses React and Vite, with custom React components and motion patterns inspired by the free, open-source React Bits library: https://github.com/DavidHDev/react-bits

## Design decisions
- Reusable React component structure and React state for the live GitHub explorer.
- Animated text-adjacent hero styling, layered orbital shapes, animated bars, reveal-on-scroll sections, and micro-interactions.
- No premium React Bits assets are required. The hero wordmark uses the free `TechText-JS-CSS` registry component.
- The exact upstream component source and CSS are stored at `src/components/TechText.jsx` and `src/components/TechText.css`.
- The registry lists no extra dependencies; TechText uses the React runtime already installed in this project and the browser Canvas API.
- All custom page animations respect `prefers-reduced-motion`; the upstream TechText component also reduces motion when that preference is enabled.
- GitHub explorer reads public repositories only; no token or backend is used.

Upstream registry: https://reactbits.dev/r/TechText-JS-CSS.json  
Component documentation: https://reactbits.dev/text-animations/tech-text

The component is copied from React Bits. Retain the upstream license and attribution requirements applicable to this component when redistributing the project.
