/**
 * Switch-style checkbox. tone="bug" marks toggles that turn on a deliberate bug,
 * tone="fix" marks toggles that apply an alternative fix.
 */
export default function Toggle({ checked, onChange, label, hint, tone = 'bug', disabled = false }) {
  return (
    <label className={`toggle toggle-${tone}`} data-disabled={disabled || undefined}>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="toggle-track" aria-hidden="true">
        <span className="toggle-thumb" />
      </span>
      <span className="toggle-text">
        <span className="toggle-label">{label}</span>
        {hint && <span className="toggle-hint">{hint}</span>}
      </span>
    </label>
  )
}
