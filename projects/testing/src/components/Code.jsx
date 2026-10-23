/** Static code snippet. variant: 'neutral' | 'wrong' | 'right' */
export default function Code({ children, label, variant = 'neutral' }) {
  return (
    <figure className={`code code-${variant}`}>
      {label && <figcaption>{label}</figcaption>}
      <pre>
        <code>{children.trim()}</code>
      </pre>
    </figure>
  )
}
