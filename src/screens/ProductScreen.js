// import React from 'react'
// import {Link} from 'react-router-dom'
// import {Row, Col, Image, ListGroup} from 'react-bootstrap'
// import  Rating from '../components/Rating'
// import products from '../productsDetails'

// function ProductScreen(match) {
//     const product = products.find((p) => p._id === match.params.id)
//   return (
//     <div>
//       <Link to='/' className='btn btn-light my-3'>Go Back</Link>
//       <Row>
//         <Col md={6}>
//         <Image src={product.image} alt={product.name} fluid />
//         </Col>

//         <Col md={3}>
//         <ListGroup variant="flush">
//             <ListGroup.Item>
//                 <h3>{product.name}</h3>
//             </ListGroup.Item>

//             <ListGroup.Item>
//                 <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
//                 </ListGroup.Item>

//                 <ListGroup.Item>
//                 Price: ${product.price}
//             </ListGroup.Item>

//             <ListGroup.Item>
//                 Description: ${product.description}
//             </ListGroup.Item>



//         </ListGroup>
//         </Col>
//       </Row>
//     </div>
//   )
// }

// export default ProductScreen


import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';  // Import useParams
import { Row, Col, Image, ListGroup, Card, Button, Form, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/loader';
import Message from '../components/message';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { listProducts } from '../actions/productActions'
import { productDetail } from '../actions/productActions'


function ProductScreen({match, history}) {
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { error, loading, product } = productDetails
  const [qty, setQty] = useState(1)

  useEffect(() => {
    dispatch(productDetail(id))


  }, [dispatch]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }



  return (

    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          : (<Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong>${product.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {product.countInStock>0 && (
                          <ListGroupItem>
                            <Row>
                              <Col>Qty</Col>
                              <Col xs='auto' className="form-select">
                                <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                    {
                                      [...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x+1} value={x+1}>
                                          {x+1}
                                        </option>
                                      ))
                                    }
                                </Form.Control>
                              </Col>
                            </Row>
                          </ListGroupItem>
                        )}
                      <ListGroup.Item>
                        <Button className='btn-block'
                         disabled={product.countInStock === 0}
                          type='button'
                          onClick={addToCartHandler}
                          >Add to Cart</Button>
                      </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          )

      }
    </div>
  );
}

export default ProductScreen;
