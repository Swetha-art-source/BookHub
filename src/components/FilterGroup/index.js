import './index.css'

const FilterGroup = props => {
  const {itemObject, isActive, onLabel} = props
  const {value, label} = itemObject
  const addActiveStyle = isActive ? 'active' : ''
  const onLabelButton = () => {
    onLabel(value)
  }

  return (
    <li>
      <button
        type="button"
        className={`filter-button ${addActiveStyle}`}
        onClick={onLabelButton}
      >
        {label}
      </button>
    </li>
  )
}

export default FilterGroup
