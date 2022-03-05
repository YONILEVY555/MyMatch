import React, { Component } from 'react'
import {Card, Button} from "react-bootstrap"
import {Color} from '@utils/constants/Color.js'

export const ViewerPotenMatch = (props) => {

    return <>

        <Card className="position-absolute card-display-match">
           { props.optionMatch!=null && <Card.Img variant="top" className="card-display-match-image" src={`data:image/jpeg;base64,${props.optionMatch.image[0].content}`} />}
            <Card.Body className="card-display-match-body">
              <Card.Text>
              { props.optionMatch!=null &&  <span>{props.optionMatch.date} </span>}
              { props.optionMatch!=null &&  <span>{props.optionMatch.username} </span>}
              { props.optionMatch!=null &&  <p class="card-text">{props.optionMatch.description} </p> }
              </Card.Text>
            </Card.Body >
            <Card.Body className="card-display-match-body">
            <Button style={{background: Color.BLUE, border: Color.BLUE  }} size="sm" className="display-match-btn" onClick={props.backClicked}>back</Button>
            <Button style={{background: Color.BLUE, border: Color.BLUE  }} variant="primary" size="sm" className="display-match-btn" onClick={props.likeClicked}>like</Button>
            <Button style={{background: Color.BLUE, border: Color.BLUE  }} variant="primary" size="sm" className="display-match-btn" onClick={props.unlikeClicked}>not like</Button>
            <Button style={{background: Color.YELLOW , border: Color.GREEN  }} variant="primary" size="sm" className="display-match-btn" onClick={props.getMorePathes}>more pathes</Button>
            </Card.Body>
          </Card>
          
     </>

}
