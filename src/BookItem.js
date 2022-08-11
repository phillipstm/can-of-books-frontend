import React, { Component } from 'react';
import { Button, ListGroup } from 'react-bootstrap'
import BookUpdate from './BookUpdate';

class BookItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showUpdate: false
    }
  }
  toggleUpdate = () => {
    this.setState({
      showUpdate: !this.state.showUpdate
    })
  }
  deleteBookHandler = () => {
    this.props.deleteBook(this.props.book._id);
  }

  render() {
    return (
      <ListGroup.Item>
        <div className='bookInfo'>
          <section>
            <h3>{this.props.book.title}</h3>
            <p>{this.props.book.description}</p>
            <p>Have I read this? {this.props.book.status}</p>
          </section>
          <Button onClick={this.toggleUpdate}>Update</Button>
          <Button onClick={this.deleteBookHandler} variant='danger'>Delete</Button>
        </div>
        {this.state.showUpdate &&
          <BookUpdate book={this.props.book} updateBook={this.props.updateBook} toggleUpdate={this.toggleUpdate}/>
        }
      </ListGroup.Item>
    )
  }
}

export default BookItem;