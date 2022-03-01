
import {FloatingLabel, Form} from 'react-bootstrap'


export const FloatingLabelsEmail = (props) => {

   return <>

        <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
        >
            
            <Form.Control
                required
                type="email" 
                name="email"
                placeholder=" " 
                value = {props.val}
                onChange={props.handleChange}
            />

            <Form.Control.Feedback>  
                Looks good!
            </Form.Control.Feedback>

            <Form.Control.Feedback type="invalid">
                Please provide a valid email.
            </Form.Control.Feedback>

        </FloatingLabel>

    </>
}


