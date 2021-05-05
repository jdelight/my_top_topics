import React from 'react';
import { Container, Row} from 'react-bootstrap';
import './TopicsWrapper.scss'


const TopicsWrapper = props => {
    return (
        <Container className="background">
            <Row>
                {props.children}
            </Row>
        </Container>
    )
}

export default TopicsWrapper;