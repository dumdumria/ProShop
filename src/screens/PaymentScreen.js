import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { useNavigate } from 'react-router-dom'
import {savePaymentMethod} from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'


function PaymentScreen() {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const[paymentMethod, setpaymentMethod] = useState('PayPal')

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    
    
    useEffect(() => {

        if(!shippingAddress.address){
            navigate('/shipping')
        }

    }, [shippingAddress, navigate ])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    
    

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='payment'
                            value='PayPal'
                            checked
                            onChange={(e) => setpaymentMethod(e.target.value)}
                        />

                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>

        </FormContainer>
    )
}

export default PaymentScreen