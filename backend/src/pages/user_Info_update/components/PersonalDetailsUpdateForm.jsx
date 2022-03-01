import React, { Component } from 'react'

import moment from 'moment'

import {FloatingLabelsDate, FloatingLabelsEmail, FloatingLabelsPhone,
         FloatingLabelsUsername, SelectsGender, TextAreasDescription, FileInput } from '@components/forms/index.js'

import {DateHelpers,FileHelpers} from '@utils/helpers/index.js'

import {Container, Row, Col,Form, Button} from 'react-bootstrap'

import UserDataService from '@api/user/UserDataService.js'

import AuthenticationService from '@services/AuthenticationService.js'

import {User} from '@components/User.js'

import {withRouter} from 'react-router-dom';

class PersonalDetailsUpdateForm extends Component {

    constructor(props){
        super(props)

            this.state = {

                            id: AuthenticationService.getLoggedInUserId(), 
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
                            image_2: null,
                            imageName_1: "No image selected yet", 
                            imageName_2: "No image selected yet" 
                          
            }
    }

    componentDidMount(){
        this.refresh()
    }

    refresh = ()=>{
        UserDataService.retrieveUser(this.state.id)
        .then( (response) =>{
            this.setState({
                id: response.data.id,
                username: response.data.username,
                gender: response.data.gender, 
                date:   moment(response.data.date).format('YYYY-MM-DD'),
                phone:  response.data.phone, 
                email:  response.data.email,
                Password: response.data.hashpassword, 
                description: response.data.description,
                image_1: response.data.image[0],
                image_2: response.data.image[1],
                image_1_id: response.data.image[0].id,
                image_2_id: response.data.image[1].id,
                base64_image_1: response.data.image[0].content,
                base64_image_2: response.data.image[1].content,
                imageName_1: response.data.image[0].name, 
                imageName_2: response.data.image[1].name
            })
        } )
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
    })
    }

    imageHandleChange = async (event) => {

        const image = await FileHelpers.getBase64(event.target.files[0])

        if( event.target.name === "image_1" ){
            this.setState(
                {
                    [event.target.name]:event.target.files[0],
                    imageName_1: event.target.files[0].name,
                    image_1:event.target.files[0],
                    base64_image_1: image
                }
            )
        }

        if( event.target.name === "image_2" ){
            this.setState(
                {
                    [event.target.name]:event.target.files[0],
                    imageName_2: event.target.files[0].name,
                    image_1: event.target.files[0],
                    base64_image_2: image
                }
            )
        }
    }

    handleSubmit = (event)=>{

        if(this.isValid(event)){
            this.updateAccount()
            event.preventDefault();
        }

        event.preventDefault();

    }

    updateAccount = async () =>{
    
        let user = new User()
        user.copy(this.state)
        user.hashpassword = this.state.Password

        UserDataService.updateUser(user,this.state.id)
            .then(this.props.history.push('/search/match/'))

        this.imageUpdate()

    }

    imageUpdate =  async() => {

        const formData = new FormData();
    
        if( this.state.image_1 != null ){
            formData.append('image',this.state.image_1)
            await UserDataService.updateImage(this.state.id,this.state.image_1_id,formData)
        }

        if( this.state.image_2 != null ){
            formData.append('image',this.state.image_2)
            await UserDataService.updateImage(this.state.id,this.state.image_2_id,formData)
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

        const btnTxt = "Update"
       
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

                   <Button as="input" type="submit" value={btnTxt} className='mt-3 mb-5'  />

                   </Form>
                 </Container> 
                 
           </>

        )
    }
}

export default withRouter(PersonalDetailsUpdateForm)