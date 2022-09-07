
/**
 * @file BestBooks.js
 * @author Teresa Phillips and Daniel Frey
 * @description Displays books.
 */
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import BookItem from './BookItem';
import CreateBook from "./CreateBook";

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
  handleShowModal = () => {
    this.setState({
      showModal: true
    })
  }
  hideModal = () => {
    this.setState({
      showModal: false
    })
  }

  getBooks = async () => {
    try {
      const response = await this.props.auth0.getIdTokenClaims();
      const jwt = response.__raw;
      const config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER_KEY,
        url: '/books',
        headers: {"authorization": jwt}
      }
      let bookData = await axios(config);
      console.log(axios(config));
      this.setState({ books: bookData.data });
    } catch (error) {
      console.log('Error Message', error.message);
    }
  }
  addBook = async (newBook) => {
    try {
      let url = `${process.env.REACT_APP_SERVER_KEY}books`
      let createdBook = await axios.post(url, newBook)
      this.setState({
        showModal: false,
        books: [...this.state.books,createdBook.data]
      });
    } catch (error) {
      console.log('Error Message', error.message);
    }
  }
  deleteBook = async (ID) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_KEY}books/${ID}`);
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
        <CreateBook showModal={this.state.showModal} hideModal={this.hideModal} addBook={this.addBook} />
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
        <Button onClick={this.handleShowModal} variant='success' id='add-button'>Add New Book</Button>
      </main>

    )
  }
}
export default withAuth0(BestBooks);
