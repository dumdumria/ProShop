import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/loader'
import Message from '../components/message'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct, createProduct, } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import { useLocation } from 'react-router-dom'


function ProductListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages,page } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const keyword = queryParams.get('keyword') || '' // Default to empty string if no keyword is provided
    const queryPage = queryParams.get('page') || 1;

    console.log('Keyword from query params:', keyword)

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo || !userInfo.isAdmin) {
            navigate(`/login`)
        }

        const validPage = queryPage ? parseInt(queryPage) : 1
        const validKeyword = keyword.trim() !== '' ? keyword : null

        if (successCreate) {
            navigate(`/admin/product/${createdProduct.id}/edit`)
        } else {
            dispatch(listProducts(validKeyword, validPage))
        }

    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, keyword, queryPage])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }

    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <div>
            <Row className='align-items-centre'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}


            {loading
                ? <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>BRAND</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>
                                            <td>

                                                <LinkContainer to={`/admin/product/${product.id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit' ></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product.id)}>
                                                    <i className='fas fa-trash' ></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Paginate pages={pages} page={page} isAdmin={true} />
                        </div>
                    )}
        </div>
    )
}

export default ProductListScreen