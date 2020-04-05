import React from 'react';
import {
    Container,
    Jumbotron,
    Button
} from 'react-bootstrap';

export default function About() {
    return (
        <Jumbotron fluid>
            <Container>
                <h1>About Mute Chat</h1>
                <p>
                    This is a modified jumbotron that occupies the entire horizontal space of
                    its parent.
    </p>
            </Container>
        </Jumbotron>
    )
}