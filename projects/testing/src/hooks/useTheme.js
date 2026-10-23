import { useEffect, useState } from 'react'

const STORAGE_KEY = 'react-events-theme'

function readStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    return null
  }
}

function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/** null means "follow the OS setting"; an explicit choice is stored per browser. */
export function useTheme() {
  const [theme, setTheme] = useState(readStoredTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme) root.dataset.theme = theme
    else delete root.dataset.theme
    try {
      if (theme) localStorage.setItem(STORAGE_KEY, theme)
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      // storage can be blocked (private mode) — the theme still works for this visit
    }
  }, [theme])

  const effective = theme ?? systemTheme()
  const toggle = () => setTheme(effective === 'dark' ? 'light' : 'dark')

  return { theme: effective, toggle }
}
