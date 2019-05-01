import React , {Component} from 'react'
import classes from './Header.scss'

class Header extends Component {

    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (<div className={classes.Header}>
            <p>true-e-logistics</p>
        </div>)
    }
}

export default Header