import {ToggleButton,ButtonGroup} from "react-bootstrap"
import {Color} from '@utils/constants/Color.js'

export const MyButtonGroup = (props) => {

    return <>
                 <ButtonGroup>

                        { props.radios.map((radio, idx) => (
                          <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            name="radioValue"
                            value={radio.value}
                            checked={props.radioValue === radio.value}
                            onChange={props.handleChange}
                            style= { props.radioValue === radio.value ? {background: Color.BLUE, border: Color.BLUE} : 
                                                                        {background: Color.GRAY, border: Color.GRAY, color: Color.BLACK }  }
                          >
                            {radio.name}
                          </ToggleButton>
                        ))}

                </ButtonGroup>
            </>
 }