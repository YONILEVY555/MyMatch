import {Component} from "react"
import AuthenticationService from "@services/AuthenticationService.js"
import {LoginWithEmail,LoginWithPhone,Title} from './components/index.js'
import {Button} from "react-bootstrap"
import {withRouter} from 'react-router-dom';
import {Color} from '@utils/constants/Color.js'


class LoginManager extends Component{

        constructor(props){
            super(props)
                this.state = {
                    phone: '',
                    email: '',
                    password: '',
                    validated: false,
                    selectEmail: false,
                    selectPhone: false,
                    errorLogin: false
                }
        }

        handleChange = (event) => {
            this.setState({
                [event.target.name] : event.target.value
            })
        }

        handleSubmit = (event) => {

            if(this.isValid(event)){

                if(this.state.selectEmail){
                    this.emailAuthentication(event)
                }else{
                    this.phoneAuthentication(event)
                }
                
            }
            
            event.preventDefault();

        }

        isValid = (event) =>{
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                this.setState({validated: true})
                 return false
            }
            
            return true
        }
         
        startLoginWithEmail = ()=>{
            this.setState({selectEmail:true})
        }
         
        startLoginWithPhone = ()=>{
            this.setState({selectPhone:true})
        }
        
        emailAuthentication = async (event) =>{
                 
            const response = await AuthenticationService.executeAuthenticationService(this.state.email, this.state.password)
            
            if(response.result){
                AuthenticationService.registerSuccessfulLogin(response.data.id)
                this.props.history.push('/search/match/')
            }else{
                this.setState({errorLogin: true})
            }

        }

        phoneAuthentication = async (event) =>{

            const response = await AuthenticationService.executeAuthenticationService(this.state.phone, this.state.password)

            if(response.result){
                AuthenticationService.registerSuccessfulLogin(response.data.id)
                this.props.history.push('/search/match/')
            }else{
                this.setState({errorLogin: true})
            }

        }
      
        render(){

            return (

                <div  className="w-50 mx-auto pb-5 pt-3 mt-5 mb-5 Background-gray">

                    <Title/>
                   
                    { (! (this.state.selectEmail || this.state.selectPhone) ) &&
                      < Button  style={{background: Color.BLUE, border: Color.BLUE  }}  size="lg" className='mb-2 mt-3 d-block mx-auto mt-5 w-50' onClick={this.startLoginWithPhone} >
                          To register by phone Click here
                        </Button>
                    }

                    { (! (this.state.selectEmail || this.state.selectPhone) ) && 
                      < Button style={{background: Color.BLUE, border: Color.BLUE  }} size="lg" className='mt-3 d-block mx-auto mt-5 w-50 mb-5' onClick={this.startLoginWithEmail} >
                          To register by email click here
                      </Button>
                    }

                    { this.state.errorLogin && <div class="alert alert-warning w-50 mt-4 mx-auto" role="alert">
                                                        Sorry, your details login was incorrect.
                                                         Please double-check your details.
                                                </div>}

                    { this.state.selectEmail && <LoginWithEmail handleSubmit={this.handleSubmit} 
                                                                handleChange={this.handleChange}
                                                                validated={this.state.validated}
                                                                password={this.state.password}
                                                                loginType={this.state.email}
                                                />}

                    { this.state.selectPhone && <LoginWithPhone handleSubmit={this.handleSubmit} 
                                                                handleChange={this.handleChange}
                                                                validated={this.state.validated}
                                                                password={this.state.password}
                                                                loginType={this.state.phone}
                    />}

                </div>

            )
            
        }

}

export default withRouter(LoginManager)