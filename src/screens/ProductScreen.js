
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';  // Import useParams
import { Row, Col, Image, ListGroup, Card, Button, Form, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/loader';
import Message from '../components/message';
import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios';
// import { listProducts } from '../actions/productActions'
import { listProductDetails, createProductReview, } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


function ProductScreen() {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { error, loading, product } = productDetails


  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { error: errorProductReview, loading: loadingProductReview, success: successProductReview } = productReviewCreate

  console.log(product)


  useEffect(() => {

    if(successProductReview){
      setRating(0)
      setComment('')
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }

    dispatch(listProductDetails(id))


  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, {
        rating,
        comment,
    }));
};

  return (

    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          : (
            <div>
              <Row>
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
                      {product.countInStock > 0 && (
                        <ListGroupItem>
                          <Row>
                            <Col>Qty</Col>
                            <Col xs='auto' className="form-select">
                              <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                {
                                  [...Array(product.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
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


              <Row>
                <Col md={6}>
                    <h4>Reviews</h4>
                    

                    {product.reviews && product.reviews.length === 0 && (<Message variant='info'>No Reviews</Message>
                    )}
                    <ListGroup variant='flush'>
                      {product.reviews && product.reviews.map((review) => (
                        <ListGroupItem key={review.id}>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} color='#f8e825'/>
                          <p>{review.createdAt.substring(0,10)}</p>
                          <p>{review.comment}</p>

                        </ListGroupItem>
                      ))}

                        <ListGroupItem>
                            <h4>Write a review</h4>

                            {loadingProductReview && <Loader/>}
                            {successProductReview && <Message variant='success'>Review Submitted</Message>}
                            {errorProductReview && <Message variant='danger'> {errorProductReview}</Message>}

                            {userInfo ? (
                              <Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating'>
                                  <Form.Label>Rating</Form.Label>
                                  <Form.Control
                                    as='select'
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                  >

                                    <option value=''>Select...</option>
                                    <option value='1'>1 - Poor</option>
                                    <option value='2'>1 - Fair</option>
                                    <option value='3'>1 - Good</option>
                                    <option value='4'>1 - Very Good</option>
                                    <option value='5'>1 - Excelent</option>
                                  </Form.Control>  
                                </Form.Group>

                                <Form.Group controlId='comment'>
                                    <Form.Label>Review</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        row='5'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    ></Form.Control>

                                </Form.Group>

                                <Button 
                                disabled={loadingProductReview}
                                type='submit'
                                variant='primary'
                                >
                                  Submit
                                </Button>

                              </Form>
                            ) : (
                              <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                            )}
                        </ListGroupItem>

                    </ListGroup>
                </Col>

              </Row>
            </div>
          )

      }
    </div>
  );
}

export default ProductScreen;
