// the same custom field as in Angular. In React the "contract" is just props:
//   value     ~ writeValue()          (parent -> component)
//   onChange  ~ registerOnChange()    (component -> parent)
//   onBlur    ~ registerOnTouched()   (component -> parent)
//   disabled  ~ setDisabledState()    (parent -> component)
type Props = {
  value: number
  onChange: (value: number) => void
  onBlur?: () => void
  disabled?: boolean
}

// Der onChange-Event-Handler in React ist ein Event, das auslöst, sobald der Wert eines Formularelements (wie <input>, <textarea> oder <select>) vom Benutzer geändert wird.
export function StarRating({ value, onChange, onBlur, disabled }: Props) {
  return (
    <span>
      {
        [1, 2, 3, 4, 5].map((star, index) => (
          <button key={index} type="button" disabled={disabled} onClick={() => onChange(star)} onBlur={onBlur}>
            {star <= value ? '★' : '☆'}
          </button>
        ))
      }
    </span>
  )
}
