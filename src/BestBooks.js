
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

  getjwt = async () => {
    const response = await this.props.auth0.getIdTokenClaims();
    return response.__raw;
  }
  getBooks = async () => {
    try {
      const jwt = await this.getjwt();
      const config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER_KEY,
        url: '/books',
        headers: { "authorization": jwt }
      }
      let bookData = await axios(config);
      this.setState({ books: bookData.data });
    } catch (error) {
      console.log('Error Message', error.message);
    }
  }
  addBook = async (newBook) => {
    try {
      const jwt = await this.getjwt();
      const config = {
        method: 'post',
        baseURL: process.env.REACT_APP_SERVER_KEY,
        url: '/books',
        data: newBook,
        headers: { "authorization": jwt }
      }
      let createdBook = await axios(config)
      this.setState({
        showModal: false,
        books: [...this.state.books, createdBook.data]
      });
    } catch (error) {
      console.log('Error Message', error.message);
    }
  }
  deleteBook = async (ID) => {
    try {
      const jwt = await this.getjwt();
      const config = {
        method: 'delete',
        baseURL: process.env.REACT_APP_SERVER_KEY,
        url: `/books/${ID}`,
        headers: { "authorization": jwt }
      }
      await axios(config);
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
      const jwt = await this.getjwt();
      const config = {
        method: 'put',
        baseURL: process.env.REACT_APP_SERVER_KEY,
        url: `/books/${book._id}`,
        data: book,
        headers: { "authorization": jwt }
      }
      let updatedBook = await axios(config);
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
