import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../components/message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useParams, useLocation, useNavigate } from "react-router-dom";



function CartScreen() {
    const { id } = useParams(); // ✅ Get product ID from URL
    const location = useLocation(); // ✅ Get location object
    const navigate = useNavigate()
    const qty = new URLSearchParams(location.search).get("qty") || 1; // ✅ Extract qty, default to 1

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart


    const dispatch = useDispatch()
    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, Number(qty)))

        }

    }, [dispatch, id, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        navigate('/shipping')
    }



    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ?
                    (<Message variant='info'>
                        Your Cart is empty <Link to='/' >Go Back </Link>
                    </Message>) : (
                        <ListGroup variant='flush' >
                            {cartItems.map(item => (
                                <ListGroupItem key={item.product}>
                                    <Row >
                                        <Col md={2} >
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/products/${id}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            ${item.price}
                                        </Col>
                                        <Col md={3} className='my-1'>
                                            <Form.Control
                                                as="select"
                                                className="form-select"
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                            >
                                                {[...Array(item.countInStock > 0 ? item.countInStock : 0).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>


                                            {/* <Form.Control as="select" className="form-select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                        {
                                            [...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x+1} value={x+1}>
                                                {x+1}
                                            </option>
                                            ))
                                        }
                                            </Form.Control> */}
                                        </Col>

                                        <Col md={1}>
                                            <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroupItem>
                        <ListGroup.Item>
                            <Button className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                                type='button'
                            >PROCEED TO CHECKOUT</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
