import { useId } from 'react'

export default function RadioGroup({ legend, options, value, onChange, disabled = false }) {
  const name = useId()

  return (
    <fieldset className="radio-group" disabled={disabled}>
      <legend>{legend}</legend>
      {options.map((option) => (
        <label key={option.value} className="radio">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </fieldset>
  )
}
