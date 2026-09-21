## What types of routes exist in Next.js?

In the App Router, every route type is a **folder naming convention**. Only a folder containing `page.tsx` becomes a URL.

### Directory

```txt
app/
├── layout.tsx                      ← root layout (receives @modal slot)
├── page.tsx                        → /
├── about/page.tsx                  → /about                (static)
├── blog/[slug]/page.tsx            → /blog/hello           (dynamic)
├── docs/[...slug]/page.tsx         → /docs/a/b             (catch-all)
├── shop/[[...filters]]/page.tsx    → /shop, /shop/a/b      (optional catch-all)
├── dashboard/                                              (nested + parallel)
│   ├── layout.tsx                  ← shared layout, renders slots
│   ├── page.tsx                    → /dashboard
│   ├── settings/page.tsx           → /dashboard/settings
│   ├── @stats/page.tsx             ← slot, not a URL
│   ├── @stats/default.tsx          ← fallback for unmatched URLs
│   ├── @feed/page.tsx
│   └── @feed/default.tsx
├── (auth)/                                                 (route group)
│   ├── layout.tsx                  ← layout only for auth pages
│   ├── login/page.tsx              → /login
│   └── register/page.tsx           → /register
├── photos/[id]/page.tsx            → /photos/1 (full page on reload)
└── @modal/                                                 (intercepting)
    ├── default.tsx                 ← no modal by default
    └── (.)photos/[id]/page.tsx     ← /photos/1 as modal on in-app click
```

### Code

```tsx
// about/page.tsx — static
export default function About() {
  return <h1>About</h1>
}

// blog/[slug]/page.tsx — dynamic (params is a Promise since Next 15)
export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params            // /blog/hello → 'hello'
  return <h1>{slug}</h1>
}

// docs/[...slug]/page.tsx — catch-all
export default async function Docs({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params            // /docs/a/b → ['a', 'b']
  return <h1>{slug.join(' / ')}</h1>
}

// shop/[[...filters]]/page.tsx — optional catch-all
export default async function Shop({ params }: { params: Promise<{ filters?: string[] }> }) {
  const { filters } = await params         // /shop → undefined
  return <h1>{filters?.join(', ') ?? 'All products'}</h1>
}

// dashboard/layout.tsx — nested layout + parallel slots
import type { ReactNode } from 'react'

export default function DashboardLayout({ children, stats, feed }: {
  children: ReactNode; stats: ReactNode; feed: ReactNode
}) {
  return (
    <main>
      {children}
      <aside>{stats}</aside>
      <aside>{feed}</aside>
    </main>
  )
}

// dashboard/@stats/default.tsx (same for @feed)
export default function Default() {
  return null
}

// (auth)/login/page.tsx — route group, URL is /login
export default function Login() {
  return <h1>Login</h1>
}

// layout.tsx (root) — renders the @modal slot
import type { ReactNode } from 'react'

export default function RootLayout({ children, modal }: {
  children: ReactNode; modal: ReactNode
}) {
  return (
    <html><body>{children}{modal}</body></html>
  )
}

// @modal/default.tsx
export default function Default() {
  return null
}

// @modal/(.)photos/[id]/page.tsx — intercepting route
export default async function PhotoModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <div className="modal">Photo {id}</div>
}

// any client component — client navigation
'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Nav() {
  const router = useRouter()
  return (
    <>
      <Link href="/photos/1">Photo</Link>
      <button onClick={() => router.push('/dashboard')}>Dashboard</button>
    </>
  )
}
```

### Summary
| Type               | Convention          | Used               |
| ------------------ | ------------------- | ------------------ |
| Static             | `about/`            | Always             |
| Dynamic            | `[slug]/`           | Always             |
| Nested             | `layout.tsx`        | Always             |
| Route group        | `(name)/`           | Often              |
| Client navigation  | `<Link>`, `router`  | Always             |
| Catch-all          | `[...slug]/`        | Rarely             |
| Optional catch-all | `[[...slug]]/`      | Rarely             |
| Parallel           | `@slot/`            | Rarely             |
| Intercepting       | `(.)`, `(..)`, `(...)` | Rarely (modals) |

_Intercepting prefixes are relative to route segments, not folders: `(.)` = same level, `(..)` = one level up, `(...)` = from `app/`. Slots like `@modal` don't count as a segment._