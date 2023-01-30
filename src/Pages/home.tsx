import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Navbars from '../Components/Navbar';
import pic from '../images/pic3.jpg'
import pic2 from '../images/pic4.jpg'
import pic3 from '../images/pic5.jpg'

export default function Home() {
  return (
    <div>
        <header>
            <Navbars/>
        </header>
        <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={pic2}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Reading is good</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={pic}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Wisdom is key</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={pic3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Knowledge is power</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

