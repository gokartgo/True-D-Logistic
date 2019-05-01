import React from 'react'
import classes from './Loader.scss'

const loader = (props) => {
    return (
        <div className={classes.LoaderContent}>
            <div className={classes.ldsRing}><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default loader