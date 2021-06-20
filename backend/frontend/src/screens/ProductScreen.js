import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button, Card, Col, Image, ListGroup, ListGroupItem, Row,Form} from "react-bootstrap";
import Rating from "../components/Rating";
import {useDispatch, useSelector} from "react-redux";
import {createProductReview, listProductDetails} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {PRODUCT_CREATE_REVIEW_RESET} from "../constants/productConstants";


function ProductScreen({match,history})
{
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,product} = productDetails
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {loading:loadingProductReview,error:errorProductReview,success:successProductReview} = productReviewCreate
    useEffect(() => {
        if(successProductReview){
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(match.params.id))

    }, [dispatch,match,successProductReview]);
    const addToCartHandler =()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)

    }
    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(createProductReview(match.params.id,rating,comment))
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>back</Link>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message> :
                    (
                        <div>
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid/>

                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price:${product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description:{product.description}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                                    </ListGroup.Item>

                                </ListGroup>

                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Price
                                                </Col>
                                                <Col>
                                                    <strong>{product.price}</strong>
                                                </Col>
                                            </Row>

                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Status
                                                </Col>
                                                <Col>
                                                    {product.countInStock >0 ? 'in Stock' : 'out of stock'}
                                                </Col>
                                            </Row>

                                        </ListGroup.Item>
                                        {
                                            product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>
                                                            QTY
                                                        </Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control as='select' value={qty} onChange={(e) =>setQty(e.target.value)}>
                                                                {
                                                                    [...Array(product.countInStock).keys()].map((x)=><option value={x+1} key={x+1}>{x+1}</option>)
                                                                }



                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )
                                        }
                                        <ListGroup.Item>
                                            <Button className='btn-block' type='button' disabled={product.countInStock == 0 } onClick={addToCartHandler}>
                                                Add to cart

                                            </Button>

                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>

                            </Col>
                        </Row>
                            <Row>
                                <Col md={6}>
                                    <h4>Reviews</h4>
                                    {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}
                                    <ListGroup variant='flush'>
                                        {product.reviews.map((review)=>(
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} color='#f8e825'/>
                                                <p>{review.createdAt.substring(0,10)}</p>
                                                <p>{review.comment}</p>

                                            </ListGroup.Item>
                                        ))}
                                        <ListGroup.Item>
                                            <h4>write a review</h4>
                                            {loadingProductReview && <Loader />}
                                            {successProductReview && <Message variant='success'>Review submitted</Message> }
                                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message> }
                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>
                                                            Rating
                                                        </Form.Label>
                                                        <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1...poor</option>
                                                            <option value='2'>2...fair</option>
                                                            <option value='3'>3...good</option>
                                                            <option value='4'>4...very good</option>
                                                            <option value='5'>5...excellent</option>

                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>
                                                            Review
                                                        </Form.Label>
                                                        <Form.Control as='textarea' row='5' value={comment} onChange={(e)=>setComment(e.target.value)}>

                                                        </Form.Control>

                                                    </Form.Group>
                                                    <Button type='submit' disabled={loadingProductReview} variant='primary'>submit</Button>

                                                </Form>
                                            ) :(
                                                <Message variant='info'>please <Link to='/login'>Login</Link> to write a review</Message>
                                            )}
                                        </ListGroup.Item>
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