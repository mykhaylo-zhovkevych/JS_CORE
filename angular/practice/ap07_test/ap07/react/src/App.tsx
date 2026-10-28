import { useState } from 'react'
import { StarRating } from './StarRating'

const initial = { name: '', rating: 0 }

export default function App() {
  const [values, setValues] = useState(initial)
  const [touched, setTouched] = useState({ name: false, rating: false })
  const [ratingDisabled, setRatingDisabled] = useState(false)

  const errors = {
    name: values.name ? null : 'required',
    rating: values.rating >= 1 ? null : 'pick a rating',
  }

  const reset = () => {
    setValues(initial)
    setTouched({ name: false, rating: false })
  }

  return (
    <>
      <form>
        {/* a native input could also be read with a ref (ref.current.value).
            StarRating has no DOM value, so it has to be controlled through props */}
        <input
          placeholder="name"
          value={values.name}
          onChange={e => setValues({ ...values, name: e.target.value })}
          onBlur={() => setTouched({ ...touched, name: true })}
        />

        <StarRating
          value={values.rating}
          onChange={rating => setValues({ ...values, rating })}
          onBlur={() => setTouched({ ...touched, rating: true })}
          disabled={ratingDisabled}
        />

        {touched.rating && errors.rating && <small>{errors.rating}</small>}

        <p>
          <button type="button" onClick={() => setValues({ ...values, rating: 3 })}>set 3</button>
          <button type="button" onClick={reset}>reset</button>
          <button type="button" onClick={() => setRatingDisabled(d => !d)}>disable / enable rating</button>
        </p>
      </form>

      <pre>
        {JSON.stringify(values, null, 2)}
        {'\n'}
        valid: {String(!errors.name && !errors.rating)} · rating touched: {String(touched.rating)}
      </pre>
    </>
  )
}
