// 物件名・家賃・エリア・間取りを表示する1件分のカード
function PropertyCard({ property, onEdit, onDelete }) {
  return (
    <li className="property-card">
      <h2 className="property-card__name">{property.name}</h2>
      <dl className="property-card__details">
        <div className="property-card__row">
          <dt>家賃</dt>
          <dd>{property.rent.toLocaleString()}円 / 月</dd>
        </div>
        <div className="property-card__row">
          <dt>エリア</dt>
          <dd>{property.area}</dd>
        </div>
        <div className="property-card__row">
          <dt>間取り</dt>
          <dd>{property.layout}</dd>
        </div>
      </dl>
      <div className="property-card__actions">
        <button type="button" onClick={() => onEdit(property)}>
          編集
        </button>
        <button type="button" onClick={() => onDelete(property.id)}>
          削除
        </button>
      </div>
    </li>
  )
}

export default PropertyCard
