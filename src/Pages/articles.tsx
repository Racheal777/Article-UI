import React, { useState, useEffect } from "react";

import "../App.css";
// import {getArticle} from "../data"
import { NavLink, Outlet } from "react-router-dom";

import axios from "axios";


export interface PostAttribute {
    _id:any
    author: string
    title:string
    description: string
    published: boolean
   
    
  }
  type PropertyProps = {
    posts: PostAttribute[];
    //children: JSX.Element | JSX.Element[];
  };




export default function Articles() {
  
const [articles, setArticles] = useState<PostAttribute[]>([])
  

  

  useEffect(() => {
    const getPosts = async() => {
        try {
            const posts = await axios.get<PostAttribute[]>('/post')
            console.log(posts.data)
            setArticles(posts.data)
        } catch (error) {
           console.log(error) 
        }
        
      }
      getPosts()
  }, []);


  return (
    <div>
      <section className="article-main">
        <h1>Articles</h1>

        <div className="article">
          {articles.map((item) => (
            <NavLink to={`/post/${item._id}`} key={item._id} className="links">
              <div className="card">
                <div className="items">
                  <h3> Author: {item.author} </h3>
                  <h2>{item.title}</h2>
                  <p>{item.description.slice(0, 200)} ...</p>
                </div>

                <div className="">
                  <p><i>Published {item.published}</i></p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>

      </section>
    </div>
  );
}