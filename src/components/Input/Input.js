import React from 'react'
import classes from './Input.scss'

const input = (props) => {
    return (
        <input
            {...props}
            className={classes.Input}
            onChange={props.changed}
            value={props.value}
            maxlength={props.maxLength}
            placeholder={props.placeholder}
        />
    )
}

export default input