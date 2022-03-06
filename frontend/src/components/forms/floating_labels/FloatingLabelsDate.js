import {FloatingLabel, Form} from 'react-bootstrap'

import DateHelpers from '@utils/helpers/DateHelpers.js'

const minAge = DateHelpers.getTodayEighteenYearsAgo()

export const FloatingLabelsDate = (props) => {

   return <>


        <FloatingLabel
            controlId="floatingInput"
            label="Birthday date"
            className="mb-3"
        >

            <Form.Control
                required
                max = {minAge}
                type="date" 
                name="date"
                placeholder=" " 
                value = {props.val}
                onChange={props.handleChange}
            />

            <Form.Control.Feedback>  
                Looks good!
            </Form.Control.Feedback>

        </FloatingLabel>

    </>
}