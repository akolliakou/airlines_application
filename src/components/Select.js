import React from 'react'

const Select = ({ onSelect, selected, all, routes, title}) => {
  const handleChange = (e) => {
    e.preventDefault()
    onSelect(e)
  }

  const isOptionDisabled = (air) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].airline === air.id || routes[i].src === air.code || routes[i].dest === air.code)
        return false
    }
    return true
  }

  return (
    <select onChange={handleChange} value={selected}>
      <option>{title}</option>
      {all.map(air => {
        const key = air.id || air.code
        return (
          <option value={air.name} key={key} disabled={isOptionDisabled(air)}>{air.name}</option>
        )
      })}
    </select>
  )
}

export default Select