import React, { Component } from 'react'
import UserDataService from '@api/user/UserDataService.js'
import AuthenticationService from '@services/AuthenticationService.js'
import {FileInput} from '@components/forms/index.js'

class FileUpload extends Component {

  constructor(props) {

    super(props);

    this.state ={
      id: AuthenticationService.getLoggedInUserId(),
      file:  null,
      image: null,
      flag:  false,
    }
    
  }
  
  componentDidMount(){
    this.refresh()
  }

  refresh = async ()=>{
 
     const res = await UserDataService.getImages(this.state.id);

     this.setState({
               image: res.data[0].content,
               flag: true
      })
  
  }

  render() {

    const image = this.state.image

    const ViewImage = ({ image }) => <img src={`data:image/jpeg;base64,${image}`} />

    return (

      <div className="mt-4">

             {this.state.flag && <ViewImage image = {image} />}

             <FileInput handleChange = {this.props.handleChange} 
                        name = {this.props.name}
                        id =   {this.props.id}
                        imageName={this.props.imageName} />

      </div>
    )

  }
}

export default FileUpload


