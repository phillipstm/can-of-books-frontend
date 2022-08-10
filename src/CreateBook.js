import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";

class CreateBook extends Component {
  handleBookSubmitHelper = (event) => {
    event.preventDefault();
    let bookToSubmit = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.checked,
    }
    this.props.addBook(bookToSubmit);
  }
  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.hideModal} >
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleBookSubmitHelper}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text'></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control type='text'></Form.Control>
            </Form.Group>
            <Form.Group controlId='status'>
              <Form.Check type='checkbox' label='Have I read it?' />
            </Form.Group>
            <Button type='submit'>Add Book</Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default CreateBook