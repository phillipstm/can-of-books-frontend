import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap'

class BookUpdate extends Component {
  updateBookHandler = (event) => {
    event.preventDefault();
    let bookToUpdate = {
      title: event.target.title.value || this.props.book.title,
      description: event.target.description.value || this.props.book.description,
      status: event.target.status.checked,
      _id: this.props.book._id,
      __v: this.props.book.__v
    }
    this.props.toggleUpdate();
    this.props.updateBook(bookToUpdate);
  }

  render() {
    return (
      <Form onSubmit={this.updateBookHandler}>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' placeholder={this.props.book.title}></Form.Control>
        </Form.Group>
        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control type='text' placeholder={this.props.book.description}></Form.Control>
        </Form.Group>
        <Form.Group controlId='status'>
          <Form.Check type='checkbox' label='Have I read it?'/>
        </Form.Group>
        <Button type='submit'>Update Book</Button>
      </Form>
    )
  }
}

export default BookUpdate;