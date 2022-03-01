import React, { Component } from 'react'
import {Button, ListGroup} from "react-bootstrap"
import AuthenticationService from '@services/AuthenticationService.js'
import UserDataService from '@api/user/UserDataService.js'

class Profile extends Component {

    constructor(props){
        super(props)
            this.state = {
                valRangeAge: 18
            }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    logout = () => {
        AuthenticationService.logout()
        this.props.history.push('/')
    }

    deleteAccount = () => {
        UserDataService.deleteUser(3)
            .then(this.logout())
    }
    
    render() {

        return (

            <div className='my-hight'>
            
            <ListGroup className="w-25 p-3 ms-auto my-overflow h-100">

                <p className="mx-auto" > Account settings </p>

                <ListGroup.Item action href="/profile/settings/update">
                    Update settings
                </ListGroup.Item>

                <p className="ms-auto mt-3" > matches </p>

                <ListGroup.Item action href="/profile/matches/show" >
                    my matches
                </ListGroup.Item>

                <p className="ms-auto mt-3" > Friends </p>

                <ListGroup.Item action href="/profile/friends/show" >
                    My friends
                </ListGroup.Item>

                <ListGroup.Item action href="/profile/friends/find" >
                    Find friends
                </ListGroup.Item>

                <ListGroup.Item action href="/profile/friends/requests" >
                    Friend requests
                </ListGroup.Item>

                <p className="ms-auto mt-3"> Discovery settings </p>
                
                <ListGroup.Item action href="/profile/settings/gender">
                    I want to meet 
                </ListGroup.Item>

                <ListGroup.Item >
                     Age preferences
                    <label for="customRange3" class="form-label"></label>
                    <input type="range" name="valRangeAge" class="form-range" min="18" max="120" step="1" id="customRange3" onChange={this.handleChange}></input>
                    <span>{this.state.valRangeAge}</span>
                </ListGroup.Item>

                <br/>
                <br/>

                <ListGroup.Item className='p-0' >
                   <Button onClick={this.logout} className='bg-transparent text-dark border-white w-100'>Logout</Button>
                </ListGroup.Item>

                <br/>
                <br/>

                <ListGroup.Item className='p-0'>
                    <Button onClick={this.deleteAccount} className='bg-transparent text-dark border-white w-100'>delete Account</Button>
                </ListGroup.Item>

            </ListGroup>,

            </div>


        )
    }
}

export default Profile