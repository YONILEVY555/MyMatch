import {FloatingLabel, Form} from 'react-bootstrap'

export const FloatingLabelsSearch = (props) => {

   return <>

        <FloatingLabel
            controlId="floatingInput"
            label="Search"
            className="mb-3"
        >
        
        <Form.Control
            className='Form-Control-height mt-2'
            type="search" 
            name="search"
            placeholder=" " 
            value = {props.val}
            onChange={props.handleChange}
        />
     
        </FloatingLabel>

    </>
}