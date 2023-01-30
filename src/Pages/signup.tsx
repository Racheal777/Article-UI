import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";

import {  NavLink, useNavigate } from "react-router-dom";

//schema validation
export const UserSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string().required().min(7),
  repeat_password: Joi.ref("password"),
});

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState('');

  const [email2Error, setEmail2Error] = useState("");
  


  let navigate = useNavigate();
  //function for saving the data
  const addUser = async (e: any) => {
    try {
      e.preventDefault();

      const { error, value } = UserSchema.validate({
        username,
        password,
        email,
      });
      if (error) {
        setError(error.message);
        
      }else{
        const signup = await axios.post("/signup", {
          username,
          password,
          email,
        });
  
        setEmail("");
        setPassword("");
        setUsername("");
        setconfirmPassword("");
        const res = signup.data;
  
        
        //if user is saved navigate to the todo page
        if (res.user) {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
       
      }
      //making a request to the api with axios for saving user data
    } catch (error: any) {
      if (error.response.data.message.includes("Failed")) {
        setEmail2Error(error.response.data.message);
      }
      console.log(error);
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
                  <h2>Register</h2>
                </div>

                <div className="full">
                {error && <span> {error} </span>}
                </div>

                <div className="full">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                 
                </div>

                <div className="full">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="******@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                 
                  {email2Error && <span> {email2Error} </span>}
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

                <div className="full">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="*********"
                    onChange={(e) => setconfirmPassword(e.target.value)}
                  />

                  
                </div>

                <button
                  type="submit"
                  // disabled={!email && !password && !username && !confirmPassword}
                  onClick={addUser}
                >
                  Create Account
                </button>

                <p>
                  Have an account <NavLink to="/login">Login</NavLink>
                </p>
              </form>
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
