import {FloatingLabel, Form} from 'react-bootstrap'

export const FloatingLabelsUsername = (props) => {

   return <>

        <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="mb-3"
        >
            
            <Form.Control 
                required
                maxlength = "15"
                minlength = "2"
                type="text" 
                name="username"
                placeholder=" " 
                value = {props.val}
                onChange={props.handleChange}
            />

            <Form.Control.Feedback>  
                Looks good!
            </Form.Control.Feedback>

            <Form.Control.Feedback type="invalid">
                Please provide a valid username.
            </Form.Control.Feedback>

        </FloatingLabel>

    </>
}