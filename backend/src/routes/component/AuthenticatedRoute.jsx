import React, { Component } from 'react'
import { Route, Redirect } from 'react-router'
import AuthenticationService from "@services/AuthenticationService.js"

class AuthenticatedRoute extends Component {
    render() {
       if(AuthenticationService.isUserLoggedIn()){
           return  <Route {...this.props}/>
       }else{
           return <Redirect to="/"/>
       }
    }
}

export default AuthenticatedRoute