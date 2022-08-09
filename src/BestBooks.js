
/**
 * @file BestBooks.js
 * @author Teresa Phillips and Daniel Frey
 * @description Displays books.
 */
import axios from "axios";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  class BookCarousel extends React.Component{
    constructor(props){
      super(props);
      this.state = {

      }
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  getBooks = async () => {
    try {
      let bookData = await axios.get(`${REACT_APP_SERVER_KEY}books`);
      this.setState({ bookData: bookData });


    } catch (error) {
      console.log('Error Message', error.message);
    }

  }
  componentDidMount() {
    this.get Books();
  }

  render() {
    function bookData(props) {
      const bookData = props.length > 0 &&
      return (
        class BookCarousel extends Component {
          render() {
              return (
                  <Carousel>
                      <div>
                          <img src="assets/1.jpeg" />
                          <p BestBooks="legend">Legend 1</p>
                      </div>
                      <div>
                          <img src="assets/2.jpeg" />
                          <p BestBooks="legend">Legend 2</p>
                      </div>
                      <div>
                          <img src="assets/3.jpeg" />
                          <p BestBooks="legend">Legend 3</p>
                      </div>
                  </Carousel>
              );
          }
      });
      
      ReactDOM.render(<BookCarousel />, document.querySelector('.demo-carousel'));
      // These are supposed to be dynamic, below component is not present here
          <div BestBooks="carousel-item">
          </div>
        </div>

        const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<BestBooks bookData={bookData} />);

      return (
        <>
          <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

          {this.state.books.length ? (
            <p key={Books.id}>Book Carousel coming soon</p>
          ) : (
            <h3>No Books Found :(</h3>
          )}
        </>
      )
    }
  }

export default BestBooks;
