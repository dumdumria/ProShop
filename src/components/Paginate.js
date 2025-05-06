import React from 'react'
import {Pagination} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


function Paginate({pages, page, keyword='', isAdmin=false}) {


    

    console.log('KEYWORD:', keyword)

    return (
      pages > 1 && (
        <Pagination>
          {[...Array(pages).keys()].map((x) => {
            const pageNumber = x + 1
            const pathname = isAdmin
              ? '/admin/productlist'
              : '/'
            const search = `?keyword=${keyword}&page=${pageNumber}`

            return (
              <LinkContainer key={pageNumber} to={{ pathname, search }}>
                <Pagination.Item active={pageNumber === page}>{pageNumber}</Pagination.Item>
              </LinkContainer>
            )
          })}
        </Pagination>
      )
    )
}
  

export default Paginate