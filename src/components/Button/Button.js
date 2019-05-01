import React from 'react'

const button = (props) => {
    return <button
        {...props}
        disabled={props.disabled}
        onClick={props.clicked}
        className={props.className}>{props.children}</button>
}

export default button