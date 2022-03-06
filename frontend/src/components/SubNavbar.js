import {Navbar, Nav, Button} from "react-bootstrap"
import {FloatingLabelsSearch} from '@components/forms/index.js'
import {Color} from '@utils/constants/Color.js'
const SubNavbar = (props) => {

    return  <>

            <Navbar   variant="dark" className="mt-5 w-50 mx-auto Background-blue">

            <Navbar.Brand href="#home">

                <h1 className=" ms-3 text-end">
                        <span className="me-3">{props.title}</span>
                </h1>
                
            </Navbar.Brand>

            <Navbar.Collapse id="navbarScroll">

            <FloatingLabelsSearch handleChange={props.handleChange} val={props.valSerach} />

            <Nav className="ms-auto">

                <Nav.Link href="/profile">
                    
                    <Button style={{background: Color.BLUE, border: Color.BLUE  }} 
                            type="button" 
                            className="btn btn-link btn-primary btn-md text-white">
                                
                                {props.btnText}

                    </Button>

                </Nav.Link>
                
            </Nav>

            </Navbar.Collapse>

            </Navbar>

            </>
 }

 export default SubNavbar