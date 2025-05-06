import React, {useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import   {listProducts} from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader  from '../components/loader'
import Message from '../components/message'
import {  useLocation } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'




function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products,page, pages} = productList


  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const keyword = searchParams.get('keyword') || '' // Get keyword from URL if available
  const pageNumber = searchParams.get('page') || 1 // Get page from URL query params

 
  useEffect(() => {

    dispatch(listProducts(keyword, pageNumber))

  }, [dispatch, keyword, pageNumber])

    return (
      <div>
          {!keyword && <ProductCarousel /> }
          <h1>Latest Products</h1>
          {loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
            : 
            <div>
            <Row>
            {products && products.length > 0 ?(
            products.map((product) => (
                <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
                </Col>
            ))) : (
              <p>No products available</p>
              
            )
           }
          
          
        </Row>
        <Paginate page={page} pages={pages} keyword={keyword}/>
        </div>
        }
      
    </div>
  )
}

export default HomeScreen
