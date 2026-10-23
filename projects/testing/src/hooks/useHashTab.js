import { useSyncExternalStore } from 'react'

function subscribe(callback) {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}

function getHash() {
  return window.location.hash.slice(1)
}

/** Returns the id of the active tab, read from (and kept in sync with) the URL hash. */
export function useHashTab(tabIds) {
  const hash = useSyncExternalStore(subscribe, getHash)
  return tabIds.includes(hash) ? hash : tabIds[0]
}
