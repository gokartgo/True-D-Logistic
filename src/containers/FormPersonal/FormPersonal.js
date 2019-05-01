import React, { Component } from 'react'
import classes from './FormPersonal.scss'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Input from '../../components/Input/Input'


class FormPersonal extends Component {

    render() {

        const { value, changed } = this.props

        return (
            <Aux>
                <div className={classes.FormPersonalContent}>
                    <Input placeholder={'First Name'} changed={changed('firstName')} value={value.firstName} />
                    <Input placeholder={'Middle Name'} changed={changed('middleName')} value={value.middleName} />
                    <Input placeholder={'Last Name'} changed={changed('lastName')} value={value.lastName} />
                    <Input placeholder={'Home Phone'} changed={changed('homePhone')} value={value.homePhone} />
                    <Input placeholder={'Mobile Phone'} changed={changed('mobilePhone')} value={value.mobilePhone} />
                    <Input placeholder={'Email Address'} changed={changed('emailAddress')} value={value.emailAddress} />
                    <Input placeholder={'Mailing Address'} changed={changed('mailingAddress')} value={value.mailingAddress} />
                    <Input placeholder={'Social Security Number'} changed={changed('socialSecurityNumber')} value={value.socialSecurityNumber} />
                </div>
            </Aux>
        )
    }
}

export default FormPersonal