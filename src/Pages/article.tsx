import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import {PostAttribute} from './articles'
import axios from "axios";

//import Form from "./form";


export default function Article() {
    const [article, setArticle] = useState<PostAttribute>();
  //making use of the useParams feature in react by assigning it to a variable called params
  //params id come as a string thus it need to be changed to an integer with the use of parseInt
  

  const { id } = useParams();
   

  useEffect(() => {
    axios
      .get(`posts/${id}`)
      .then((response) => {
        setArticle(response.data);

        //setHouse(response.data)
        console.log("house", article);

        console.log("response", response.data);
        
      })
      .catch((error) => console.log(error));
  }, []);

  
  return (
    <div>
      <section className="article-one">
        <div className="story">
          <h2> {article?.title}</h2>
          
          <div className="disc">
            <p>{article?.description}</p>
            
          </div>

          <div className="author">
            
            <span className="name">Author: {article?.author}</span>
          </div>

          
        </div>

        
      </section>
    </div>
  );
}