
// import React, { useState, useEffect } from 'react'
// import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { PayPalButton } from 'react-paypal-button-v2'
// import Message from '../components/message'
// import Loader from '../components/loader'
// import { useParams } from 'react-router-dom'

// import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
// import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

// function OrderScreen() {

//     const dispatch = useDispatch()
//     const { id: orderId } = useParams()
//     const navigate = useNavigate();


//     const [sdkReady, setSdkReady] = useState(false)

//     const orderDetails = useSelector(state => state.orderDetails)
//     const {  loading, error, order } = orderDetails

//     console.log("orderDetails:", orderDetails)
//     console.log("order:", order)
//     console.log("error:", error)


//     const orderPay = useSelector(state => state.orderPay)
//     const { loading: loadingPay, success: successPay } = orderPay

//     const orderDeliver = useSelector(state => state.orderDeliver)
//     const { loading: loadingDeliver, success: successDeliver } = orderDeliver

//     const userLogin = useSelector(state => state.userLogin)
//     const { userInfo } = userLogin


//     if (!loading && !error && order?.orderItems) {
//         order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
//     }


//     //AX5ilYxhiiIMEt0kXbu6OUT4l0aBlBWbM6qlvlHWGna3EDtqTwbaEhtuRYUT0kVmqsnbBXyojxKf7CsB

//     const addPayPalScript = () => {
//         const script = document.createElement('script')
//         script.type = 'text/javascript'
//         script.src = 'https://www.paypal.com/sdk/js?client-id=AX5ilYxhiiIMEt0kXbu6OUT4l0aBlBWbM6qlvlHWGna3EDtqTwbaEhtuRYUT0kVmqsnbBXyojxKf7CsB'
//         script.async = true
//         script.onload = () => {
//             setSdkReady(true)
//         }
//         document.body.appendChild(script)
//     }

//     useEffect(() => {

//         console.log('order.id:', order?._id, 'orderId:', orderId)

//         if (!userInfo) {
//             navigate('/login')
//             return
//         }
    
//         const shouldFetchOrder =
//             !order || Number(order.id) != Number(orderId) || successPay || successDeliver
    
//         if (successPay) {
//             dispatch({ type: ORDER_PAY_RESET })
//         }
    
//         if (successDeliver) {
//             dispatch({ type: ORDER_DELIVER_RESET })
//         }
    
//         if (shouldFetchOrder) {
//             dispatch(getOrderDetails(orderId))
//         } else if (!order.isPaid && !sdkReady) {
//             if (!window.paypal) {
//                 addPayPalScript()
//             } else {
//                 setSdkReady(true)
//             }
//         }
//     }, [dispatch, orderId, successPay, successDeliver, navigate, userInfo, order, sdkReady])
    


//     const successPaymentHandler = (paymentResult) => {
//         dispatch(payOrder(orderId, paymentResult))
//     }

//     const deliverHandler = () => {
//         dispatch(deliverOrder(order))
//     }

//     return loading ? (
//         <Loader />
//     ) : error ? (
//         <Message variant='danger'>{error}</Message>
//     ) : (
//         <div>
//             <h1>Order: {order.id}</h1>
//             <Row>
//                 <Col md={8}>
//                     <ListGroup variant='flush'>
//                         {order.shippingAddress && (
//                             <ListGroup.Item>
//                                 <h2>Shipping</h2>
//                                 <p><strong>Name: </strong> {order.user.name}</p>
//                                 <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
//                                 <p>
//                                     <strong>Shipping: </strong> </p>
//                                 <p>
//                                     <strong>Shipping: </strong>
//                                     {order.shippingAddress?.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
//                                 </p>

//                                 {order.isDelivered ? (
//                                     <Message variant='success'>Delivered on {order.deliveredAt}</Message>
//                                 ) : (
//                                     <Message variant='warning'>Not Delivered</Message>
//                                 )}
//                             </ListGroup.Item>
//                         )}

//                         <ListGroup.Item>
//                             <h2>Payment Method</h2>
//                             <p>
//                                 <strong>Method: </strong>
//                                 {order.paymentMethod}
//                             </p>
//                             {order.isPaid ? (
//                                 <Message variant='success'>Paid on {order.paidAt}</Message>
//                             ) : (
//                                 <Message variant='warning'>Not Paid</Message>
//                             )}

//                         </ListGroup.Item>

//                         <ListGroup.Item>
//                             <h2>Order Items</h2>
//                             {order.order_items?.length === 0 ? (<Message variant='info'>
//                                 Order is empty
//                             </Message>) : (
//                                 <ListGroup variant='flush'>
//                                     {order.order_items.map((item, index) => (
//                                         <ListGroup.Item key={index}>
//                                             <Row>
//                                                 <Col md={1}>
//                                                     <Image src={item.image} alt={item.name} fluid rounded />
//                                                 </Col>

//                                                 <Col>
//                                                     <Link to={`/product/${item.product}`}>{item.name}</Link>
//                                                 </Col>

//                                                 <Col md={4}>
//                                                     {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
//                                                 </Col>
//                                             </Row>
//                                         </ListGroup.Item>
//                                     ))}
//                                 </ListGroup>
//                             )}
//                         </ListGroup.Item>

//                     </ListGroup>

//                 </Col>

//                 <Col md={4}>
//                     <Card>
//                         <ListGroup variant='flush'>
//                             <ListGroup.Item>
//                                 <h2>Order Summary</h2>
//                             </ListGroup.Item>

//                             <ListGroup.Item>
//                                 <Row>
//                                     <Col>Items:</Col>
//                                     <Col>${order.itemsPrice}</Col>
//                                 </Row>
//                             </ListGroup.Item>

//                             <ListGroup.Item>
//                                 <Row>
//                                     <Col>Shipping:</Col>
//                                     <Col>${order.shippingPrice}</Col>
//                                 </Row>
//                             </ListGroup.Item>

//                             <ListGroup.Item>
//                                 <Row>
//                                     <Col>Tax:</Col>
//                                     <Col>${order.taxPrice}</Col>
//                                 </Row>
//                             </ListGroup.Item>

//                             <ListGroup.Item>
//                                 <Row>
//                                     <Col>Total:</Col>
//                                     <Col>${order.totalPrice}</Col>
//                                 </Row>
//                             </ListGroup.Item>


//                             {!order.isPaid && (
//                                 <ListGroup.Item>
//                                     {loadingPay && <Loader />}

//                                     {!sdkReady ? (
//                                         <Loader />
//                                     ) : (
//                                         <PayPalButton
//                                             amount={order.totalPrice}
//                                             onSuccess={successPaymentHandler}
//                                         />
//                                     )}
//                                 </ListGroup.Item>
//                             )}
//                         </ListGroup>
//                         {loadingDeliver && <Loader />}
//                         {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
//                             <ListGroup.Item>
//                                 <Button
//                                     type='button'
//                                     className='btn btn-block'
//                                     onClick={deliverHandler}
//                                 >
//                                     Mark As Delivered
//                                 </Button>
//                             </ListGroup.Item>
//                         )}
//                     </Card>
//                 </Col>
//             </Row>
//         </div>
//     )
// }

// export default OrderScreen


import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import Message from '../components/message'
import Loader from '../components/loader'
import { useParams } from 'react-router-dom'

import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

function OrderScreen() {

    const dispatch = useDispatch()
    const { id: orderId } = useParams()
    const navigate = useNavigate();

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const {  loading, error, order } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if (!loading && !error && order?.orderItems) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AX5ilYxhiiIMEt0kXbu6OUT4l0aBlBWbM6qlvlHWGna3EDtqTwbaEhtuRYUT0kVmqsnbBXyojxKf7CsB'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
            return
        }

        const shouldFetchOrder =
            !order || Number(order.id) != Number(orderId) || successPay || successDeliver

        if (successPay) {
            dispatch({ type: ORDER_PAY_RESET })
        }

        if (successDeliver) {
            dispatch({ type: ORDER_DELIVER_RESET })
        }

        if (shouldFetchOrder) {
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid && !sdkReady) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, successDeliver, navigate, userInfo, order, sdkReady])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <h1>Order: {order.id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        {order.shippingAddress && (
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p><strong>Name: </strong> {order.user.name}</p>
                                <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                <p>
                                    <strong>Shipping: </strong> 
                                    {order.shippingAddress?.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                </p>

                                {order.isDelivered ? (
                                    <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                                ) : (
                                    <Message variant='warning'>Not Delivered</Message>
                                )}
                            </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
//                             <h2>Order Items</h2>
//                             {order.order_items?.length === 0 ? (<Message variant='info'>
//                                 Order is empty
//                             </Message>) : (
                                <ListGroup variant='flush'>
                                    {order.order_items.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}

                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalScriptProvider options={{ "client-id": "AX5ilYxhiiIMEt0kXbu6OUT4l0aBlBWbM6qlvlHWGna3EDtqTwbaEhtuRYUT0kVmqsnbBXyojxKf7CsB" }}>
                                            <PayPalButtons
                                                amount={order.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            />
                                        </PayPalScriptProvider>
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>

                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={deliverHandler}
                                >
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen
