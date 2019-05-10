import React from 'react'
import classes from './ButtonFinish.scss'
import Button from '../Button/Button'

const buttonStart = (props) => {
    return (
        <Button {...props} className={classes.ButtonFinish}>
            Finish
        </Button>
    )
}

export default buttonStart