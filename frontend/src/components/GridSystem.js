import React from 'react'
import { Container , Row, Col} from "react-bootstrap"

const GridSystem = (props) => {

    let indexView =0
    
    const buildGrid = ()=> {

        return (renderRows())
    
    }

    const renderRows = () =>{
        let rows = []

        for( let row = 0; row < props.rowcount ; row++ ){

            rows.push(
                <Row className="Row">
                    {
                        renderCols()
                    }
               </Row>
            )
        }

        return rows;

    }                               

    const renderCols = () =>{

        let cols = []

        for( let col=0; col < props.colCount && indexView < props.view.length ; col++ ){

            if( props.view != null ){
                cols.push(
                    <Col className="Col text-center">  
                        {
                           props.view[indexView++]
                        }
                    </Col>
                )
            }
        }

        return cols
}


return (

        <Container className="container w-50 p-3">
            {
            buildGrid()
            }
        </Container>

    );
};

export default GridSystem;