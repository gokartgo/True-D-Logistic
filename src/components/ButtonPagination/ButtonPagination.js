import React from 'react'
import Button from '../Button/Button'
import classes from './ButtonPagination.scss'

const ButtonPaganation = (props) => {
    console.log('props', props)
    let attachedClass
    if (props.disabled) {
        attachedClass = [classes[props.type], classes.ButtonPagination, classes.Disabled].join(' ')
    } else {
        attachedClass = [classes[props.type], classes.ButtonPagination].join(' ')
    }
    return (
        <Button {...props} className={attachedClass}>{props.type}</Button>
    )
}

export default ButtonPaganation