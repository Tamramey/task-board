import { useState } from 'react'
import './PropertyForm.css'

const emptyValues = { name: '', rent: '', area: '', layout: '' }

// 物件の新規登録・編集で共通利用するフォーム
function PropertyForm({ initialValues, submitLabel, onSubmit, onCancel }) {
  const [values, setValues] = useState(initialValues ?? emptyValues)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSubmitting(true)

    try {
      await onSubmit({
        name: values.name.trim(),
        rent: Number(values.rent),
        area: values.area.trim(),
        layout: values.layout.trim(),
      })
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <label className="property-form__field">
        <span>物件名</span>
        <input type="text" value={values.name} onChange={handleChange('name')} required />
      </label>

      <label className="property-form__field">
        <span>家賃(円)</span>
        <input
          type="number"
          value={values.rent}
          onChange={handleChange('rent')}
          required
          min="0"
        />
      </label>

      <label className="property-form__field">
        <span>エリア</span>
        <input type="text" value={values.area} onChange={handleChange('area')} required />
      </label>

      <label className="property-form__field">
        <span>間取り</span>
        <input
          type="text"
          value={values.layout}
          onChange={handleChange('layout')}
          placeholder="例: 1LDK"
          required
        />
      </label>

      {errorMessage && <p className="property-form__error">{errorMessage}</p>}

      <div className="property-form__actions">
        <button type="submit" disabled={submitting}>
          {submitting ? '保存中...' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={submitting}>
            キャンセル
          </button>
        )}
      </div>
    </form>
  )
}

export default PropertyForm
