import React, { Component } from 'react'
import classes from './FormEmployee.scss'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Input from '../../components/Input/Input'


class FormEmployee extends Component {

    render() {

        const { value, changed } = this.props

        return (
            <Aux>
                <div className={classes.FormEmployee}>
                    <Input placeholder={'Employer Name'} changed={changed('employerName')} value={value.employerName} />
                    <Input placeholder={'Employer Address'} changed={changed('employerAddress')} value={value.employerAddress} />
                    <Input placeholder={'Work Phone'} changed={changed('workPhone')} value={value.workPhone} />
                    <Input placeholder={'Job Position'} changed={changed('jobPosition')} value={value.jobPosition} />
                </div>
            </Aux>
        )
    }
}

export default FormEmployee