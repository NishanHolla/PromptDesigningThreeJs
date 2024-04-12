import Carousel from 'react-bootstrap/Carousel';
import Banner1 from '../images/banner1.jpg';
import Banner2 from '../images/banner2.jpg';
import Banner3 from '../images/banner3.jpg';

function Slideshow() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className='banner'
          src={Banner1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>See it, wear it, love it.</h3>
          <p>Experience the magic of AR fashion and find your perfect fit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='banner'
          src={Banner2}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>AR you ready for a makeover?</h3>
          <p>Discover the latest trends and styles with AR fashion and transform your look in minutes.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='banner'
          src={Banner3}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Fashion at your fingertips.</h3>
          <p>
          Try on hundreds of outfits and accessories with AR fashion and shop with confidence.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slideshow;