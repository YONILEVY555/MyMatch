import React from "react"
import { FloatingLabelsPassword, FloatingLabelsPhone } from '@components/forms/floating_labels/index.js'
import {Container, Row, Col, Button, Form} from 'react-bootstrap'
import {Color} from '@utils/constants/Color.js'


export const LoginWithPhone= (props) => {
    
            return (

                <>

                    <Container className='mt-5'>

                        <Form onSubmit={props.handleSubmit} noValidate validated={props.validated}>

                            <Row className="justify-content-md-center">

                                <Col lg="8">
                                    <p class="fs-3">Enter your number phone:</p>
                                </Col>

                            </Row>

                            <Row className="justify-content-md-center">

                                <Col lg="8">
                                    <FloatingLabelsPhone handleChange={props.handleChange} val={props.loginType} name="phone"/>
                                </Col>

                            </Row>

                            <Row className="justify-content-md-center mt-3">

                                <Col lg="8">
                                    <p class="fs-3">Enter your password:</p>
                                </Col>

                            </Row>

                            <Row className="justify-content-md-center">

                                <Col lg="8">
                                    <FloatingLabelsPassword handleChange={props.handleChange} val={props.password} name="password"/>
                                </Col>

                            </Row>

                            <Row className="justify-content-md-center">

                                <Col lg="4">
                                    < Button style={{background: Color.BLUE, border: Color.BLUE  }} size="lg" className='mb-2 mt-3 w-50' type="submit" >Login</Button>
                                </Col>

                            </Row>

                        </Form>

                    </Container>

                </>

            )
            
}


