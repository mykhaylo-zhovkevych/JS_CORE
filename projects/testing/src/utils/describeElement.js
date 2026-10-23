/**
 * Short, readable label for a DOM node, e.g. <button.inspector-btn> or
 * <span.badge>. Used in event logs to tell target and currentTarget apart.
 */
export function describeElement(node) {
  if (node == null) return String(node)
  if (node === document) return 'document'
  if (node === window) return 'window'
  if (node.nodeType === Node.TEXT_NODE) return '#text'
  if (!(node instanceof Element)) return node.nodeName ?? String(node)

  let label = node.tagName.toLowerCase()
  if (node.id) label += `#${node.id}`

  const classes = typeof node.className === 'string' ? node.className.split(/\s+/).filter(Boolean) : []
  if (classes.length) label += `.${classes.slice(0, 2).join('.')}`

  if (node.dataset?.name) label += `[${node.dataset.name}]`

  return `<${label}>`
}
