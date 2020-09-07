import React from 'react'

function InputDiv(props) {
    return (
        <div className="inputDiv">
                        <label htmlFor={props.tag}>
                            <div>
                                <b>{props.tag}</b>
                            </div>
                            <div>
                                <input type={props.type} value={props.value} onChange={props.onChange} required/>
                            </div>
                        </label>
                    </div>
    )
}

export default InputDiv
