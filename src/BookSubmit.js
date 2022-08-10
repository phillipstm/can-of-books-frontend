import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';


class BookSubmit extends React.Component {

    handleBookSubmit = async (event) => {
        event.preventDefault();
        let newBook = {
            title: event.target.title.value,
            description: event.target.description.value,
            status: event.target.status.value,
        }
        this.postBook(newBook);
    }

    render() {

        return (
            <Container className="mt-5">
                <Form onSubmit={this.handleBookSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Button type="submit">Add Book</Button>
                </Form>
            </Container>
        );
    }
}

export default BookSubmit;
