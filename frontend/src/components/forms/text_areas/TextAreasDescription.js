import {FloatingLabel, Form} from 'react-bootstrap'

export const TextAreasDescription = (props) => {


   return   <>

                <FloatingLabel controlId="floatingTextarea2" label="Description">
                   <Form.Control
                     valid = "false"
                     maxlength = "250"
                     as="textarea"
                     placeholder="Leave a comment here"
                     style={{ height: '100px' }}
                     name="description"
                     value = {props.val}
                     onChange={props.handleChange}
                   />

                   
                  <Form.Control.Feedback>  
                     Looks good!
                  </Form.Control.Feedback>

                </FloatingLabel>

            </>
}