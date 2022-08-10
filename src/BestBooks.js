'Use Strict'
/**
 * @file BestBooks.js
 * @author Teresa Phillips and Daniel Frey
 * @description Displays books.
 */
import axios from "axios";
import React from "react";
import { Carousel, Button } from "react-bootstrap";
import BookSubmit from "./BookSubmit";
// import UpdateBookForm from "./BookFormModal";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  // make api call for our new 
  postBook = async (newBookObject) => {
    //   //so we can post to our db
    try {
      let url = `${process.env.REACT_APP_SERVER_KEY}/books`;
      let createdBook = await axios.post(url, newBookObject);
      console.log('Back from the server the new book: ', createdBook);
      this.setState({
        books: [...this.state.books, createdBook.data]
      });
    } catch (error) {
      console.log('we hav an error: ', error.response.data);
    }
  }



  //create a way to delete our obj
  deleteBooks = async (id) => {
    try {
      //create our route to server
      let url = `${process.env.REACT_APP_SERVER_KEY}/books/${id}`;
      //call the server and delete the book, now it will be gone from our db
      await axios.delete(url);
      //then we should remove it from our local state.
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: updatedBooks
      });
    } catch (error) {
      console.log('we have an error: ', error.response.data);
    }
  };
  updateBooks = async (bookToUpdate) => {
    try {
      let url = `${process.env.REACT_APP_SERVER_KEY}/books/${bookToUpdate._id}`;
      let updatedBook = await axios.put(url, bookToUpdate);
      let updateBookArray = this.state.books.map(exsistingBook => {
        return exsistingBook._id === bookToUpdate._id
          ? updatedBook.data
          : exsistingBook
      });
      this.setState({
        books: updateBookArray
      });
    } catch (error) {
      console.log('Danger Will Robinson,EEEEErrrrooorr!', error.response.data);
    }
  };

  getBooks = async () => {
    try {
      let bookData = await axios.get(`${process.env.REACT_APP_SERVER_KEY}books`);
      this.setState({
        books: bookData.data
      });
    } catch (error) {
      console.log('Error Message', error.message);
    }

  }
  componentDidMount() {
    this.getBooks();
  }

  render() {
    return (
      <>
        <h2>HEADER</h2>

        <BookSubmit label="Add a Book" onSave={this.updateBookArray} />

        {this.state.books.length ? (
          <Carousel>
            {this.state.books.map((book, idx) => (
              <Carousel.Item key={idx}>
                <img
                  className="d-block w-100 h-50"
                  src="/book.jpg"
                  alt={book.name}
                />
                <Carousel.Caption>
                  <h3>{book.name}</h3>
                  <p>{book.description}</p>
                  <p>{book.status}</p>
                  <Button onClick={() => this.deleteBooks(book._id)}>Delete</Button>
                  <Button onClick={this.updateBooks}>Update</Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }

}
export default BestBooks;

// class Book extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       showUpdateForm: false,
//     };
//   }

//   render() {
//     console.log('Deleeeetttte!', this.props.book);
//     return (
//       <>
//         <Carousel.Item key={this.props.books._id}>
//           {this.props.book.title} is {this.props.book.description}

//           <Button variant="info" onClick={() => this.setState({ showUpdateForm: true })}>Update</Button>

//           <Button variant="Removed" onClick={() => this.props.deleteBooks(this.props.book._id)}>Delete</Button>
//         </Carousel.Item>

//         {this.state.showUpdateForm && <UpdateBookForm book={this.props.book}
//           updateBooks={this.props.updateBooks} />}
//       </>
//     )
//   }
// }
