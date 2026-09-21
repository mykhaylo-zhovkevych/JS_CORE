## What is Next.js and what problem does it solve?

**Core**  
Next.js is a React framework that gives React a server side. Pages aren't only built in the browser. They can be rendered to finished HTML at build time or per request on the server. Routing, build, and optimization come built in.

**Next.js** is considered a **full-stack framework**, because in one project it combines **frontend + backend + server rendering**, without the need to set up a separate server.

### Problems with pure React (SPA)

In a pure React SPA, the server sends an almost empty HTML file (`<div id="root"></div>`) plus a JS bundle. All rendering happens in the browser.

This causes these problems:
- **SEO:** The content only exists after the JS runs. Google does render JS, but with a delay. Many other crawlers and link previews (WhatsApp, Slack) don't render it at all.
- **Blank screen:** The browser first has to download and execute the whole JS bundle.
- **Data waterfall:** First the JS loads, then the page renders, and only then is the data fetched. That means yet another spinner.
- **Everything manual:** You assemble routing, build setup, and route-based code splitting yourself (React Router etc.).
- **No given structure:** Every project invents its own architecture.

### When to use it, when not

It's usually unnecessary for pure apps behind a login with no SEO needs (admin dashboard, internal tool), where Vite + React is enough. It doesn't fit well for browser extensions, React Native, or Electron, since no Next.js server runs there. And if a large separate backend already exists (e.g. Java or C#), you'll barely use Next.js's backend features.

### How is SSG different from SSR?

| Criterion       | SSG                         | SSR                                   |
| --------------- | --------------------------- | ------------------------------------- |
| When rendered   | At build time               | On each request                       |
| Speed           | Fastest (static files, CDN) | Fast, but slower (render per request) |
| Server load     | Minimal                     | Higher                                |
| Personalization | No                          | Yes                                   |

_When SSG is not suitable_
- personalized data
- data depends on cookies
- frequent content changes (without ISR)

### Can Next.js only be used as frontend?

Next.js can be, and often is, used _only as a frontend_ with an external backend (REST, GraphQL, or gRPC).
The presence of the full-stack capabilities does not oblige you to use them.

Next.js then handles:
- UI layer (React)
- Routing
- SEO rendering
- Performance optimization

And all business logic and data live in an external backend:
- NestJS
- Spring
- Laravel
- any API

Note: SSR still requires a Node.js server at runtime. A fully static frontend is only possible with static export (`output: 'export'`), which drops SSR.

### Can Next.js be redundant?

Next.js is a powerful tool, but not always justified. There are scenarios where its capabilities are either not used or create unnecessary complexity:
- Simple SPA without SEO
- Purely client-side application
    - Everything works in the browser
    - Data only through an API
    - No server logic

It can complicate deployment, increase server load, and offer minimal out-of-the-box advantages.
