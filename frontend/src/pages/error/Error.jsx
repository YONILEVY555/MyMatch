import React, { Component } from 'react'
import {Container, Row, Col, Nav} from 'react-bootstrap'


class Error extends Component {
    render() {
        return (

            <Container className='mt-5'>

                <Row className="justify-content-md-center">

                    <Col lg="8">
                        <p class="fs-1 text-start fw-bold">Sorry</p>
                    </Col>

                </Row>

                <Row className="justify-content-md-center">

                    <Col lg="8">
                        <h1 class="fs-1 mb-4 text-start fw-bold">We did not find what you were looking for</h1>
                    </Col>

                </Row>

                <Row className="justify-content-md-center">

                    <Col lg="8">
                        <p class="fs-3 text-start">You should check if the address you entered is correct</p>
                    </Col>

                </Row>

                <Row className="justify-content-md-center">

                    <Col lg="8">
                        <p className="fs-3 text-start">Try searching again or continue<Nav.Link href="/" className="my">To our home page</Nav.Link></p>                        
                    </Col>

                </Row>

            </Container> 

        )
    }
}

export default Error
