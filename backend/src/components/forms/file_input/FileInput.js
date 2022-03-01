import {Form} from 'react-bootstrap'

export const FileInput = (props) => {

    const ViewImage = ({ image }) => <img src={`data:image/jpeg;base64,${image}`} className="image-input-file w-25" />

    return  <>
                <Form.Group controlId="formFile" className=" image-upload mt-5">

                <Form.Label for={props.id}  className='w-100' >

                        {props.image && <ViewImage image = {props.image} />}
                         
                        {props.image && <div className=' bg-secondary border border-dark px-3 text-center py-3  d-inline-block w-25'> 
                             Select your image                                                                    
                        </div >}
                        
                        {props.image && <div  className='bg-light border border-dark text-start ps-3 pe-5 py-3 d-inline-block w-50'>         
                            {props.imageName} 
                        </div >}

                        {!props.image && <div className=' bg-secondary border border-dark px-3 text-center py-3  d-inline-block w-25 h-100'> 
                             Select your image                                                                    
                        </div >}
                        
                        {!props.image && <div  className='bg-light border border-dark text-start ps-3 pe-5 py-3 d-inline-block w-75'>         
                            {props.imageName} 
                        </div >}
                    

                </Form.Label>

                <Form.Control     
                                  id={props.id}
                                  required
                                  type="file"
                                  required
                                  name= {props.name}
                                  onChange={props.handleChange}
                                  accept="image/png, image/gif, image/jpeg" 
                                />

                <Form.Control.Feedback>  
                    Looks good!
                </Form.Control.Feedback>

                <Form.Control.Feedback type="invalid">
                    Please provide a valid file.
                </Form.Control.Feedback>

                </Form.Group>

         

            </>
}