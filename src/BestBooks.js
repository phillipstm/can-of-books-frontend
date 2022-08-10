
/**
 * @file BestBooks.js
 * @author Teresa Phillips and Daniel Frey
 * @description Displays books.
 */
import axios from "axios";
import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import BookItem from './BookItem';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
    }
  }

  componentDidMount() {
    this.getBooks();
  }
  getBooks = async () => {
    try {
      let bookData = await axios.get(`${process.env.REACT_APP_SERVER_KEY}books`);
      this.setState({ books: bookData.data });

    } catch (error) {
      console.log('Error Message', error.message);
    }
  }
  deleteBook = async (ID) => {
    try {
      let url = `${process.env.REACT_APP_SERVER_KEY}books/${ID}`;
      await axios.delete(url);
      let updatedArray = this.state.books.filter(currentBook => currentBook._id !== ID);
      this.setState({
        books: updatedArray
      });
    } catch (error) {
      console.log(error.response);
    }
  }
  updateBook = async (book) => {
    try {
      let url = `${process.env.REACT_APP_SERVER_KEY}books/${book._id}`
      let updatedBook = await axios.put(url, book);
      console.log(updatedBook);
      let updatedArray = this.state.books.map(currentBook => currentBook._id === updatedBook.data._id ? updatedBook.data : currentBook);
      this.setState({
        books: updatedArray
      });
    } catch (error) {
      console.log(error.response);
    }
  }

  render() {
    return (
      <main>
        <Button onClick={this.handleShowModal}>Add New Book</Button>
        {/* <CreateBook showModal={this.state.showModal} handleBookSubmit={this.handleBookSubmit} /> */}
        <ListGroup>
          {
            this.state.books.length > 0 &&
            this.state.books.map(book =>
              <BookItem
                book={book}
                key={book._id}
                deleteBook={this.deleteBook}
                updateBook={this.updateBook}
              />)
          }
        </ListGroup>
      </main>

    )
  }
}
export default BestBooks;
