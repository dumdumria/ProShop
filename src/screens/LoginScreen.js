import React, {useState, useEffect} from 'react'
import { Link, } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Loader  from '../components/loader'
import Message from '../components/message'
import {login} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { useNavigate, useLocation } from 'react-router-dom'





function LoginScreen() {
    const [email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const location = useLocation()

    const redirect = new URLSearchParams(location.search).get('redirect') || '/'
    


    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])
    

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant= 'danger' >{error}</Message>}
            {loading && <Loader/>}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address </Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Button type= 'submit' variant='primary'>
                    Sign In
                </Button>

            </Form>


            <Row className='py-3'>
                <Col>
                    New Customer ? <Link
                    to ={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>

        </FormContainer>
           
    )
}

export default LoginScreen