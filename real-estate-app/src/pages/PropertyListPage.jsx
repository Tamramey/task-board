import { useEffect, useState } from 'react'
import PropertyCard from '../components/PropertyCard'
import PropertyForm from '../components/PropertyForm'
import { useAuth } from '../context/AuthContext'
import { createProperty, deleteProperty, fetchProperties, updateProperty } from '../lib/propertiesApi'
import './PropertyListPage.css'

function PropertyListPage() {
  const { user, signOut } = useAuth()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  // 新規登録フォームの表示状態
  const [isCreating, setIsCreating] = useState(false)
  // 編集中の物件(nullなら編集フォームを表示しない)
  const [editingProperty, setEditingProperty] = useState(null)

  const loadProperties = async () => {
    setLoading(true)
    setErrorMessage('')
    try {
      const data = await fetchProperties()
      setProperties(data)
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProperties()
  }, [])

  const handleCreate = async (values) => {
    const created = await createProperty({ ...values, userId: user.id })
    setProperties((prev) => [created, ...prev])
    setIsCreating(false)
  }

  const handleUpdate = async (values) => {
    const updated = await updateProperty(editingProperty.id, values)
    setProperties((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    setEditingProperty(null)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('この物件を削除しますか?')) return
    try {
      await deleteProperty(id)
      setProperties((prev) => prev.filter((p) => p.id !== id))
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <div className="property-list-page">
      <header className="property-list-page__header">
        <div>
          <h1>物件一覧</h1>
          <p className="property-list-page__user">{user?.email} でログイン中</p>
        </div>
        <button type="button" onClick={signOut}>
          ログアウト
        </button>
      </header>

      {errorMessage && <p className="property-list-page__error">{errorMessage}</p>}

      {editingProperty ? (
        <PropertyForm
          initialValues={editingProperty}
          submitLabel="更新する"
          onSubmit={handleUpdate}
          onCancel={() => setEditingProperty(null)}
        />
      ) : isCreating ? (
        <PropertyForm
          submitLabel="登録する"
          onSubmit={handleCreate}
          onCancel={() => setIsCreating(false)}
        />
      ) : (
        <button type="button" className="property-list-page__add" onClick={() => setIsCreating(true)}>
          + 新しい物件を登録
        </button>
      )}

      {loading ? (
        <p className="property-list-page__empty">読み込み中...</p>
      ) : properties.length === 0 ? (
        <p className="property-list-page__empty">登録されている物件はありません</p>
      ) : (
        <ul className="property-list">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={setEditingProperty}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default PropertyListPage
