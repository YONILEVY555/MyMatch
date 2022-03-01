import React from 'react'
import {Container, Row, Col,Image} from "react-bootstrap"

//emptyOrfull
//children

const GridSystem = (props) => {
    let ichildren =0
    let iGridSystem =0

    const buildGrid = ()=> {

        return (renderRows())
    
    }

    const renderRows = () =>{
        let rows = []

        for(let row = 0;row< props.rowcount ;row++){

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

        for(let col=0; col<props.colCount;col++){

            //emptyOrfull[iGridSystem]

            if( props.gridSystemPathesData!=null && props.gridSystemPathesData[ichildren] != undefined && props.gridSystemPathesData[ichildren].index == iGridSystem ){
                cols.push(
                    <Col className="Col text-center">  
                        { <Image src={`data:image/jpeg;base64,${props.gridSystemPathesData[ichildren].content}`} roundedCircle className="grid-image" id={props.gridSystemPathesData[ichildren].index} /> }       
                    </Col>
                )
                ichildren++;
            }else{
                cols.push(
                    <Col className="Col text-center">
                    </Col>
                )
            }
            iGridSystem++
        }
       return cols
    }

    return (

        <Container className="container w-50 p-3 position-absolute container-grid-syatem">
            {
            buildGrid()
            }
        </Container>

    );
};

export default GridSystem;
