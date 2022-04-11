import React from 'react'

const Header = ({ columns }) => {
  return (
    <tr>
      {columns.map((column, idx) => <th key={idx}>{column.name}</th>)}
    </tr>
  )
}

export default Header