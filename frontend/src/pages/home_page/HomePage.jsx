import React, { Component } from 'react'
import {Card,Button} from "react-bootstrap"
import {Color} from '@utils/constants/Color.js'

class HomePage extends Component {

    
  constructor(props){
    super(props)
        this.state = {
            
        }
  }

  CreateAccountClicked = () => {
        this.props.history.push('/registration')
  }

    render() {
        return (

            <>

                <Card className="mx-auto card-home-page">

                    <Card.Header>registration</Card.Header>

                    <Card.Body>
                        <Card.Title>It's quick and easy</Card.Title>

                        < Button style={{background: Color.BLUE, border: Color.BLUE  }} size="lg" className='mb-2 mt-3' onClick={this.CreateAccountClicked} >Create account</Button>

                    </Card.Body>

                    <Card.Footer className="text-muted">
                        By clicking register, you agree to the terms, policies and policies on our cookies.
                        You may receive text message alerts from us.
                        You can revoke your consent at any time.
                    </Card.Footer>

                </Card>

            </>

        )
    }
}

export default HomePage