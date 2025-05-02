import React, {useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import   {listProducts} from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader  from '../components/loader'
import Message from '../components/message'


function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products} = productList

    useEffect(()=> {
      dispatch(listProducts())

    },[dispatch])
    
    return (
      <div>
          <h1>Latest Products</h1>
          {loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
            : <Row>
            {products && products.length > 0 ?(
            products.map((product) => (
                <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
                </Col>
            ))) : (
              <p>No products available</p>
              
            )
           }
          
          
        </Row>}
      
    </div>
  )
}

export default HomeScreen
