import React from 'react'

const Button = ({ onClick, value, disabled }) => {
  const handleClick = (e) => {
    e.preventDefault()
    onClick(e)
  }

  return (
    <button onClick={handleClick} value={value} disabled={disabled}>Show All Routes</button>
  )
}

export default Button