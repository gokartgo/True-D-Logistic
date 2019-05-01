import React from 'react'
import classes from './ButtonStart.scss'
import Button from '../Button/Button'

const buttonStart = (props) => {
    return (
        <Button {...props} className={classes.ButtonStart}>
            Start
        </Button>
    )
}

export default buttonStart