
/**
 * @file BestBooks.js
 * @author Teresa Phillips and Daniel Frey
 * @description Displays books.
 */
import axios from "axios";
import React from "react";
import { Carousel } from "react-bootstrap";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }


  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  getBooks = async () => {
    try {
      let bookData = await axios.get(`${process.env.REACT_APP_SERVER_KEY}books`);
      this.setState({ books: bookData.data });

    } catch (error) {
      console.log('Error Message', error.message);
    }

  }
  componentDidMount() {
    this.getBooks();
  }

  render() {
    let bookDisplay
    console.log('bookdata', this.state.books);

    if (this.state.books.length === 0) {
      bookDisplay = <p>Sorry, the book collection is empty at this time.</p>
    } else {
      bookDisplay =
        <Carousel style={{ width: '250px', margin: 'auto' }}>
          {this.state.books.map(book => {
            return (
              <Carousel.Item>
                <img src='https://via.placeholder.com/200x300.png?text=Book+cover' alt="book cover" />
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                  <p>{book.status}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
    }
    return bookDisplay;
  }

}
export default BestBooks;
