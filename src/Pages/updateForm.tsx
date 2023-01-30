import React, { useState } from 'react'
import { Row, Col, Container } from "react-bootstrap";
import {  NavLink, useNavigate } from "react-router-dom";
import Joi from 'joi';
import axios from 'axios';
import { useParams } from "react-router-dom";


export const PostSchema = Joi
  .object({
    
    author: Joi.string(),
    title: Joi.string(),
    description: Joi.string(),
    published: Joi.boolean(),
  })

  

export default function UpdateForm() {
    const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [error, setError] = useState('');


  let navigate = useNavigate();
  //function to save a post
  const updatePost = async (e: any) => {
    try {
      e.preventDefault();

      const { error, value } = PostSchema.validate({
        author, description, title, published
      });
      if (error) {
        setError(error.message);
        
      }else{
        const { id } = useParams();
        const add = await axios.put(`/postt/${id}`, {
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
              <form onSubmit={updatePost}>
                <div className="title">
                  <h2>UPDATE A POST</h2>
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
                  onClick={updatePost}
                >
                  update Post
                </button>

                
              </form>
            </section>
          </Col>
        </Row>
      </Container> 
    </div>
  )
}
