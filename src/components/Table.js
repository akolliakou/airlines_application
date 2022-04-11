import React, { useState } from 'react'
import Header from './Header'
import Rows from './Rows'

const Table = ({ className, columns, routes, format }) => {
  const [page, setPage] = useState(0)
  const resultsPerPage = 25
  const pageStart = page * resultsPerPage

  const paginateRoutes = (routes) => {
    return routes.slice(pageStart, pageStart + resultsPerPage)
  }

  const nextPage = (e) => {
    e.preventDefault()
    setPage(page + 1)
  }

  const prevPage = (e) => {
    e.preventDefault()
    setPage(page - 1)
  }

  const pageEnd = () => {
    if (routes.length < pageStart + 1 * resultsPerPage) {
      return routes.length
    } else {
      return pageStart + 1 * resultsPerPage
    }
  }

  return (
    <div>
      <table className={className}>
        <tbody>
          <Header columns={columns} />
          <Rows routes={paginateRoutes(routes)} columns={columns} format={format} />
        </tbody>
      </table>
      <div className="pagination">
        <p>Showing {pageStart + 1}-{pageEnd()} of {routes.length} routes</p>
        <p>
          <button onClick={prevPage} disabled={page === 0}>Previous Page</button>
          <button onClick={nextPage} disabled={pageEnd() >= routes.length}>Next Page</button>
        </p>
      </div>
    </div>
  )
}

export default Table