import React from 'react'

const Rows = ({ columns, routes, format }) => {
  return (
    routes.map(row => {
      const rowCells = columns.map(column => {
        const value = row[column.property]
        return <td key={column.property + value}>{format(column.property, value)}</td>
      })
      return <tr key={Object.values(row)}>{rowCells}</tr>
    })
  )
}

export default Rows