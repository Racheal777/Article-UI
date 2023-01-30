import React, { useState } from 'react'
import { Row, Col, Container } from "react-bootstrap";
import {  NavLink, useNavigate } from "react-router-dom";
import Joi from 'joi';
import axios from 'axios';


export const PostSchema = Joi
  .object({
    
    author: Joi.string(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    published: Joi.boolean(),
  })

  

export default function Form() {
    const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [error, setError] = useState('');


  let navigate = useNavigate();
  //function to save a post
  const addPost = async (e: any) => {
    try {
      e.preventDefault();

      const { error, value } = PostSchema.validate({
        author, description, title, published
      });
      if (error) {
        setError(error.message);
        
      }else{
        const id:any = window.localStorage.getItem("userId")
        console.log('id', id)
        const add = await axios.post(`/post/${id}`, {
            author, description, title, published
        });
  
        setAuthor("");
        setTitle("");
        setDescription("");
        
        const results = add.data ;
  
        console.log('data', results)
        //if user is saved navigate to the todo page
        if (results) {
          setTimeout(() => {
            navigate("/allposts");
          }, 2000);
        }
       
      }
      //making a request to the api with axios for saving user data
    } catch (error: any) {
      if (error) {
        setError(error);
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
              <form onSubmit={addPost}>
                <div className="title">
                  <h2>ADD A POST</h2>
                </div>

                <div className="full">
                {error && <span> {error} </span>}
                </div>

                <div className="full">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    placeholder="title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                 
                </div>

                <div className="full">
                  <label>Author</label>
                  <input
                    type="text"
                    name="author"
                    value={author}
                    placeholder="author"
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                 
                  
                </div>


                <div className="full">
                  <label>Description</label>
                  <textarea name="description" value={description} placeholder='write here ......'
                  onChange={(e) => setDescription(e.target.value)}
                  > 
                    </textarea>
                 
                  
                </div>

                <div className="full">
                  <label>Published</label>
                  <input
                    type="checkbox"
                    name="published"
                    
                    
                    onChange={(e) => setPublished(!published)}
                  />
                  
                </div>

                

                <button
                  type="submit"
                  // disabled={!email && !password && !username && !confirmPassword}
                  onClick={addPost}
                >
                  Add Post
                </button>

                
              </form>
            </section>
          </Col>
        </Row>
      </Container> 
    </div>
  )
}
