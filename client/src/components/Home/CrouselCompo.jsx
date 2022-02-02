import React from 'react';
import { Carousel } from 'react-bootstrap';

const CrouselCompo = () => {
  return <div>
      <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height={"700px"}
          src="https://image.freepik.com/free-vector/mega-sale-banner-blue-yellow-colors_1017-32176.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height={"700px"}
          src="https://image.freepik.com/free-vector/gradient-colorful-sale-wallpaper_52683-55788.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height={"700px"}
          src="https://image.freepik.com/free-vector/mega-sale-offers-banner-template_1017-31299.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  </div>;
};

export default CrouselCompo;
