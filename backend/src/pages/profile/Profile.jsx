import React, { Component } from 'react'
import {Button, ListGroup} from "react-bootstrap"
import AuthenticationService from '@services/AuthenticationService.js'
import UserDataService from '@api/user/UserDataService.js'
import {MyButtonGroup} from '@components/forms/index.js'

class Profile extends Component {

    constructor(props){
        super(props)
            this.state = {
                id: AuthenticationService.getLoggedInUserId(),
                valRangeAge: 18,
                valRangeDistance: 50,
                radioValue: ''
            }
    }

    componentDidMount(){
         window.addEventListener("beforeunload", this.onUnload);
        this.refresh()
    }

    onUnload = e => { 
        this.updatePreferences()
     }

     componentWillUnmount() {
         window.removeEventListener("beforeunload", this.onUnload);
     }
 
    refresh = async () =>{
      const preferences =  await UserDataService.getPreferences(this.state.id);
      this.setState({valRangeAge : preferences.data.maxAge,
                     valRangeDistance: preferences.data.maxDistace,
                     radioValue: preferences.data.gender
                   })
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

    updatePreferences= async () => {

        var requestParam = {
            params: {
              age: this.state.valRangeAge,
              distance: this.state.valRangeDistance,
              gender: this.state.radioValue,
            }
        }

        await UserDataService.updatePreferences(this.state.id,requestParam);

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
                
                <ListGroup.Item>

                        <p>I prefer:</p>

                        <MyButtonGroup handleChange={this.handleChange} 
                                     radios={[
                                                { name: 'male', value: 'MALE' },
                                                { name: 'female', value: 'FEMALE' }
                                             ]}
                                     radioValue = {this.state.radioValue} />

                </ListGroup.Item>

                
                <ListGroup.Item >
                    distance preferences
                    <label for="customRange4" class="form-label"></label>
                    <input type="range" name="valRangeDistance" className="form-range" min="0" max="180" step="1" id="customRange4" value={this.state.valRangeDistance} onChange={this.handleChange}></input>
                    <span>{this.state.valRangeDistance}</span>
                </ListGroup.Item>

                <ListGroup.Item >
                     Age preferences
                    <label for="customRange3" class="form-label"></label>
                    <input type="range" name="valRangeAge" class="form-range" min="18" max="120" step="1" id="customRange3" value={this.state.valRangeAge} onChange={this.handleChange}></input>
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