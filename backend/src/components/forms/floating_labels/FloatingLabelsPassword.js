import {FloatingLabel, Form} from 'react-bootstrap'


export const FloatingLabelsPassword = (props) => {

   return <>

        <FloatingLabel
            controlId="floatingInput"
            label={props.name}
            className="mb-3"
        >
            
            <Form.Control 
                required
                maxlength = "25"
                minlength = "5"
                type="password" 
                name={props.name}
                placeholder=" " 
                value = {props.val}
                onChange={props.handleChange}
            />

            <Form.Control.Feedback>  
                Looks good!
            </Form.Control.Feedback>

            <Form.Control.Feedback type="invalid">
                Use 8 characters or more for your password
            </Form.Control.Feedback>


        </FloatingLabel>

    </>
}