import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import AuthenticationService from "@services/AuthenticationService.js"
import {Navbar, Nav,Dropdown,Button } from "react-bootstrap"
import {Color} from '@utils/constants/Color.js'

class Header extends Component {
    
    render(){

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()

        return (  
        
        <Navbar className="Background-purple" variant="dark">
     
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src="https://www.seekpng.com/png/full/100-1009446_circle-association-of-pharmaceutical-teachers-of-india.png"
                    className="d-inline-block align-top header-image"
                 />
                <span className=" header-image-txt color-text-pink">MATCH</span>
            </Navbar.Brand>

            <Nav className="ms-auto">

                <Dropdown>
                {/* btn btn-light nav-link btn-lg dropdown-toggle text-dark header-btn-lang */}
                    <Dropdown.Toggle variant="light" className="dropdown-toggle size-btn-header mt-2 me-3" id="dropdown-basic">
                               language
                    </Dropdown.Toggle>

                    <Dropdown.Menu>

                        <Dropdown.Item href="#/action-1">עברית</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">English</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Russian</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Arabic</Dropdown.Item>

                    </Dropdown.Menu>

                 </Dropdown>

                { ! isUserLoggedIn &&

                    <Nav.Link href="/login">
                        <Button type="button" variant="light" className="btn btn-ligh size-btn-header ms-3 me-3">Login</Button>
                    </Nav.Link>
                }

                { isUserLoggedIn &&

                    <Nav.Link href="/find/match">
                        <Button type="button" variant="light" className="btn btn-ligh size-btn-header ms-3">Find match</Button>
                    </Nav.Link>
                }

                { isUserLoggedIn &&

                    <Nav.Link href="/profile">
                        <Button type="button" variant="light" className="btn btn-ligh size-btn-header ms-3 me-3">profile</Button>
                    </Nav.Link>
                }

              

            </Nav>
        
        </Navbar>)
    }
}

export default withRouter(Header)