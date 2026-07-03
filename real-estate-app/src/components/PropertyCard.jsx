// 物件名・家賃・エリアを表示する1件分のカード
function PropertyCard({ property }) {
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
      </dl>
    </li>
  )
}

export default PropertyCard
