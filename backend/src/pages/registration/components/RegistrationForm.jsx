import React, { Component } from 'react'

import {FloatingLabelsDate, FloatingLabelsEmail, FloatingLabelsPassword, FloatingLabelsPhone,
         FloatingLabelsUsername, SelectsGender, TextAreasDescription,  FileInput} from '@components/forms/index.js'

import {DateHelpers,FileHelpers} from '@utils/helpers/index.js'

import {Container, Row, Col,Form, Button} from 'react-bootstrap'

import {UserDataService,UriDataService} from '@api/index.js'

import AuthenticationService from '@services/AuthenticationService.js'

import {User} from '@components/User.js'

import {withRouter} from 'react-router-dom';

import {Color} from '@utils/constants/Color.js'

class RegistrationForm extends Component {

    constructor(props){
        super(props)

            this.state = {

                            id: 0, 
                            username:   '',
                            gender: '', 
                            date:   DateHelpers.getTodayEighteenYearsAgo(),
                            phone:  '', 
                            email:  '', 
                            password:   '',
                            confirm: '',
                            description: '',
                            validated: false,
                            image_1: null,
                            image_2:null,
                            base64_image_1: null,
                            base64_image_2: null,
                            imageName_1: "No image selected yet", 
                            imageName_2: "No image selected yet"  
            }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
    })
    }

    imageHandleChange = async (event) => {

        const base64 = await FileHelpers.getBase64(event.target.files[0])

        if( event.target.name === "image_1" ){
            this.setState(
                {
                    [event.target.name]:event.target.files[0],
                    imageName_1: event.target.files[0].name,
                    image_1:event.target.files[0],
                    base64_image_1: base64
                }
            )
        }

        if( event.target.name === "image_2" ){
            this.setState(
                {
                    [event.target.name]:event.target.files[0],
                    imageName_2: event.target.files[0].name,
                    image_1:event.target.files[0],
                    base64_image_2: base64
                }
            )
        }
    }

    handleSubmit = (event)=>{

        if(this.isValid(event)){
            this.createAccount()
            event.preventDefault();
        }
             
        event.preventDefault();
        
    }

    createAccount = async () =>{
    
        try{
        let user = new User()
        user.copy(this.state)

        const createUserResponse = await UserDataService.createUser(user);

        const newUser = await UriDataService.getByUri(createUserResponse.data)

        this.imageUpload(newUser.data.id)
        
        const UriDataServiceResponse = await UriDataService.getByUri(createUserResponse.data);
        
        AuthenticationService.registerSuccessfulLogin(UriDataServiceResponse.data.id)
        
        this.props.history.push('/search/match/')

        }catch(e){
              console.log(e)
        }

    }

    imageUpload =  async(id) => {

        let formData = new FormData();

        if( this.state.image_1 != null ){
            formData.append('image',this.state.image_1)
            await UserDataService.uploadImage(id,formData)
        }

        if( this.state.image_2 != null ){
            formData.append('image',this.state.image_2)
            await UserDataService.uploadImage(id,formData)
        }

    }

    isValid = (event) =>{
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            this.setState({validated: true})
             return false
        }
        
        return true
    }

    render() {

        const btnTxt = "צור חשבון"
       
        return (

           <>

                <Container className='mt-4'>
                <Form onSubmit={this.handleSubmit} noValidate validated={this.state.validated}>
                   <Row className="justify-content-md-center">

                        <Col lg="4">
                            <FloatingLabelsPhone handleChange={this.handleChange} val={this.state.phone}/>
                        </Col>

                        <Col lg="4">
                            <FloatingLabelsEmail handleChange={this.handleChange} val={this.state.email}/>
                        </Col>

                   </Row>

                   <Row className="justify-content-md-center">

                        <Col    lg="8">

                            <FloatingLabelsUsername handleChange={this.handleChange} val={this.state.username}/>  

                        </Col>

                   </Row>

                    <Row className="justify-content-md-center">

                        <Col lg="4">
                            <FloatingLabelsPassword handleChange={this.handleChange} val={this.state.password} name="password"/>
                        </Col>

                        <Col lg="4">
                            <FloatingLabelsPassword handleChange={this.handleChange} val={this.state.confirm} name="confirm"/>
                        </Col>

                   </Row>

                    <Row className="justify-content-md-center">

                        <Col lg="4">
                            <FloatingLabelsDate handleChange={this.handleChange} val={this.state.date}/>
                        </Col>

                        <Col lg="4">
                            <SelectsGender handleChange={this.handleChange} val={this.state.gender}/>
                        </Col>

                    </Row>

                    <Row className="justify-content-md-center">

                        <Col    lg="8">

                            < TextAreasDescription handleChange={this.handleChange} val={this.state.description}/>  

                        </Col>

                   </Row>

                   <Row className="justify-content-md-center">

                        <Col    lg="8">

                        <FileInput  handleChange={this.imageHandleChange} 
                                    name="image_1"
                                    id="file_upload_1"
                                    imageName={this.state.imageName_1}
                                    image={this.state.base64_image_1} />  

                        </Col>

                    </Row>

                    
                   <Row className="justify-content-md-center">

                        <Col    lg="8">

                        <FileInput  handleChange={this.imageHandleChange} 
                                    name="image_2"
                                    id="file_upload_2"
                                    imageName={this.state.imageName_2}
                                    image={this.state.base64_image_2} />    

                        </Col>

                   </Row>

                   <Button style={{background: Color.BLUE, border: Color.BLUE  }} as="input" type="submit" value={btnTxt} className='mt-4 mb-5'   />

                   </Form>
                 </Container> 
                 
           </>

        )
    }
}

export default withRouter(RegistrationForm)