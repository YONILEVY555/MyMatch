import {FloatingLabel, Form} from 'react-bootstrap'


export const FloatingLabelsPhone = (props) => {

   return <>

        <FloatingLabel
            controlId="floatingInput"
            label="Phone number"
            className="mb-3"
        >
            
            <Form.Control 
                required
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                type="tel" 
                name="phone"
                placeholder=" " 
                value = {props.val}
                onChange={props.handleChange}
            />

            <Form.Control.Feedback>  
                Looks good!
            </Form.Control.Feedback>

            <Form.Control.Feedback type="invalid">
                Please provide a valid number phone.
            </Form.Control.Feedback>

        </FloatingLabel>

    </>
}