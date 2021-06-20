import React, {useEffect, useState} from 'react';
import FormContainer from "../components/FormContainer";
import {Button, Form, Row} from "react-bootstrap";
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {login} from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

function LoginScreen({location,history})
{
    const userLogin = useSelector(state => state.userLogin)
    const {loading,error,userInfo} = userLogin
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }

    }, [history,userInfo,redirect]);

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }

    
    return (
        <FormContainer>
            <h1>Sign in</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId={'email'}>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='enter email' value={email} onChange={(e)=>setEmail(e.target.value)}>

                    </Form.Control>


                </Form.Group>
                <Form.Group controlId={'password'}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='enter password' value={password} onChange={(e)=>setPassword(e.target.value)}>

                    </Form.Control>


                </Form.Group>
                <Button type='submit' variant='primary'>sign in</Button>
            </Form>
            <Row className='py-3'>
                new customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                Register
            </Link>

            </Row>


        </FormContainer>
    );
}

export default LoginScreen;