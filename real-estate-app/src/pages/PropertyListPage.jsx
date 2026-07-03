import PropertyCard from '../components/PropertyCard'
import { useAuth } from '../context/AuthContext'
import { dummyProperties } from '../data/dummyProperties'
import './PropertyListPage.css'

function PropertyListPage() {
  const { user, signOut } = useAuth()

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

      <ul className="property-list">
        {dummyProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </ul>
    </div>
  )
}

export default PropertyListPage
