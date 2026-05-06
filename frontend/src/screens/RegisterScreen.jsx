import React, { useEffect, useState } from "react";
import { Form, Button, Row , Col } from "react-bootstrap";

import FormContainer from "../components/FormContainer";
import { useRegisterMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate , Link } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";



const RegisterScreen = () => {
   
     const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name , setName] = useState("");
    const [confirmPassword, setconfirmPassword]  = useState("");
    const [errorMsg, setErrorMsg]= useState("");


    const dispatch = useDispatch();
    const navigate = useNavigate();
    


     const [register , {isLoading}] = useRegisterMutation();


    const{userInfo} = useSelector((state)=>state.auth);
    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";
    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
    }, [userInfo,navigate,redirect]);



  const submitHandler = async (e) => {
    e.preventDefault();
    if(password!== confirmPassword){
        setErrorMsg("Password donot match")
        return;
    } else {
         try {
    
     const res = await register({name, email, password }).unwrap();
     console.log("success",res);
    dispatch(setCredentials({...res}));
    navigate(redirect);
    
   } catch (error) {
    console.log("error:",error);
    
    setErrorMsg(error?.data?.message || error.message)
    
   }

    }
    
  
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      {errorMsg && <Message variant = "danger">{errorMsg}</Message>}

      <Form onSubmit={submitHandler}>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => {
                setName(e.target.value);
                setErrorMsg("");
            }
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {

            setEmail(e.target.value);
            setErrorMsg("");
            }
        }
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
                setErrorMsg("");
            }
            }
          ></Form.Control>
        </Form.Group>


         <Form.Group className="my-2" controlId="password">
          <Form.Label> Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => {
                setconfirmPassword(e.target.value);
                setErrorMsg("");
            }
            }
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" disabled={isLoading}>
          Register
        </Button>
        {isLoading && <Loader/>}
        </Form>

        <Row className="py-3">
            <Col>
            Already have an account? {""} 
            <Link to ={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
            </Link>
            </Col>
        </Row>
      
    </FormContainer>
  );
};

export default RegisterScreen;
