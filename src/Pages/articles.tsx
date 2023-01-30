import React, { useState, useEffect } from "react";

import "../App.css";
// import {getArticle} from "../data"
import { NavLink } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Navbars from "../Components/Navbar";
import pic2 from '../images/pic2.jpg'
import ReactPaginate from "react-paginate";

export interface PostAttribute {
    _id:any
    author: string
    title:string
    description: string
    published: boolean
   
    
  }
  




export default function Articles() {
  
const [articles, setArticles] = useState<PostAttribute[]>([])
  
const [currentPage, setCurrentPage] = useState(0);
  


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

  const PER_PAGE = 3;
const offset = currentPage * PER_PAGE;
 articles.slice(offset, offset + PER_PAGE)
    
const pageCount = Math.ceil(articles.length / PER_PAGE);

function handlePageClick({ selected }:any) {
  setCurrentPage(selected);
}

  return (
    <>

<header>
  <Navbars/>
</header>
      <section className="article-main">
        <h1>Articles</h1>

        <div className='btn'>
            <Button > <a href="/form">Add a post</a></Button>
            </div>
        
        <Row xs={1} md={3} className="cards g-6">
          {articles.slice(offset, offset + PER_PAGE).map((item) => (
             <Col>
             <Card className="cardz" key={item._id}>
             <Card.Img variant="top" src={pic2} />
             <Card.Body>

            
            <NavLink to={`/post/${item._id}`}  className="links">
            <Card.Title>{item.title}</Card.Title>
              
              <Card.Text>
                <div className="items">
                  <p> Author: {item.author} </p>
                 
                 
                </div>

                
                </Card.Text>
            </NavLink>
            
            </Card.Body>
          </Card>
        </Col>
          ))}

          
 </Row>

      </section>
      <ReactPaginate
        previousLabel={"← Previous "}
        nextLabel={" Next → "}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
        
      />
      
      
    </>
  );
}