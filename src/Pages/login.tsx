import React, { useState, useEffect } from "react";
import axios from "axios";
import Joi from "joi";
import { NavLink, Link } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  
} from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";


export const UserSchema = Joi.object({
  
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string().required().min(7),
  
});


export default function Login() {
  //state for the user input
 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  //function for saving the data
  //using the spread operator to get access to each object and assigning the value
  //to the field that matches the name
  const addUser = async (e:any) => {
    try {
      e.preventDefault();
      
      const { error, value } = UserSchema.validate({
        
        password,
        email,
      });
      if (error) {
        setError(error.message);
        
      }else{
        const login = await axios.post(
          "/login",
          {
            email,
            password,
          }
          
        );
  
        const res = login.data;
        console.log('user',res)
        setEmail("");
        setPassword("");
        
        //if user is found, navigate the user to the todo app
        if (res) {
          navigate("/allposts");
          const id = window.localStorage.setItem("userId", (res._id));
          console.log('iddd',id)
        }
        console.log('userrrrrrr',)

  
      }  
      // console.log(res);
    } catch (error:any) {
      if (error) {
        setEmailError(error.message);
      }

      console.log(error.message);
    }
  };
  

  return (
    <div>
      <Container fluid>
        <Row className="formz">
          <Col xs={12} md={5}>
            <section className="form-body">
              <form onSubmit={addUser}>
                <div className="title">
                  <p>Welcome back </p>
                  <h2>Login</h2>
                </div>
                <div className="full">{error && <span> {error} </span>}</div>
                

                <div className="full">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="******@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!email && <span> {emailError} </span>}
                </div>

                <div className="full">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="*********"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  
                </div>

                <button type="submit" onClick={addUser}>
                  Login
                </button>

                
                
                <p>
                  Dont have an account{" "}
                  <NavLink to="/register">Register</NavLink>
                </p>
              </form>
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  );
}