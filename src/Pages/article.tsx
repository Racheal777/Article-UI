import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostAttribute } from "./articles";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Navbars from "../Components/Navbar";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function Article() {
  const [article, setArticle] = useState<PostAttribute>();
  const [user, setUser] = useState("");
  const [success, setSuccess] = useState(false);
  

  const { id } = useParams();
  const Id:any = window.localStorage.getItem("userId")
  useEffect(() => {
    axios
      .get(`posts/${id}`)
      .then((response) => {
        setArticle(response.data.post);
        setUser(response.data.user);
        
        console.log('postss', response.data)
      })
      .catch((error) => console.log(error))

      
  }, []);


  

  useEffect(() => {
    if(Id === user){
      console.log('ygyrdrjytrdjr')
      setSuccess(true)
      
  
    }
  }, [user]);
  console.log('succ', success)
  //delete post
  const navigate = useNavigate();
  

  const deletePost = async (e:any) => {
    try {
      e.preventDefault();
      const deleteAPost = await axios.delete(
        `/postz/${id}`
       
      );

      if(deleteAPost.data === "post deleted"){
        navigate("/allposts");
      }

    } catch (error) {
      console.log(error);
    }
  };


  

  return (
    <div>
      <header>
        <Navbars />
      </header>
      <Row className="article">
        <div className="story">
          <img src="https://unsplash.com/photos/SGY0LIfTKZ4" alt="pic" />

<hr />
          <div>
            <h2> {article?.title}</h2>

            <div className="disc">
              <p>{article?.description}</p>
            </div>

            <div className="author">
              <span className="name">Author: {article?.author}</span>
            </div>
          </div>
        </div>

        {success === true && (
          <div className="flex">
          <div className="btn">
            <Button>
              {" "}
              <NavLink to={`/updateform/${id}`}  className="links">Update post</NavLink>
             
            </Button>
            
          </div>

          <div className="btn-delete">
            <button  onClick={deletePost}>
              {" "} 
              <a href="/">Delete</a>
            </button>
          </div>
        </div>
        ) }
      </Row>
    </div>
  );
}
