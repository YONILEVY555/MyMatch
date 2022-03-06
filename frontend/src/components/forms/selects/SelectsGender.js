import {FloatingLabel, Form} from 'react-bootstrap'

export const SelectsGender = (props) => {

   return  <>

                <FloatingLabel controlId="floatingSelect" label="Gender">

                  <Form.Select name="gender" value = {props.val} onChange={props.handleChange}>
                    <option value='UNDEFINED'>UNDEFINED</option>
                    <option value='MALE'>MALE</option>
                    <option value='FEMALE'>FEMALE</option>
                  </Form.Select>

                  <Form.Control.Feedback>  
                       Looks good!
                  </Form.Control.Feedback>

                </FloatingLabel>

            </>
}