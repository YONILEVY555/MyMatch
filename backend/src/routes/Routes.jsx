import React, {Component} from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { Error, HomePage, Login, Profile, Registration, SearchMatch, ShowFriends, UserInfoUpdate, ShowMatches, ShowFriendRequests, FindFriends } from '@pages/index.js'
import FileUpload from '@pages/test/FileUpload.jsx'
import { AuthenticatedRoute, Footer, Header } from '@routes/component/index.js'


class Routes extends Component {
    render(){
               
        return(
           
            <div className="MyApp">

                <Router>

                    <>

                        <Header/>

                        <Switch>
                            {/* <Route path="/chat_room/" component={}/> */}
                            <Route path="/file/" component={FileUpload}/>
                            <AuthenticatedRoute path="/search/match/" component={SearchMatch}/> 
                            <AuthenticatedRoute path="/profile/settings/update" component={UserInfoUpdate}/> 
                            <Route path="/registration/" component={Registration}/>
                            <Route path="/login/" component={Login}/>
                            <AuthenticatedRoute path="/profile/friends/show/" component={ShowFriends}/>
                            <AuthenticatedRoute path="/profile/matches/show/" component={ShowMatches}/>
                            <AuthenticatedRoute path="/profile/friends/requests" component={ShowFriendRequests}/>
                            <AuthenticatedRoute path="/profile/friends/find" component={FindFriends}/>
                            <AuthenticatedRoute path="/profile/" component={Profile}/>
                            <Route path="/" exact component={HomePage}/>
                            <Route component={Error}/>
                        </Switch>

                    </>

                        <Footer/>

                </Router>

            </div>
        )
    }
}

export default Routes