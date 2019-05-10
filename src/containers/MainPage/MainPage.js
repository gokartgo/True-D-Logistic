import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import axios from '../../../axios'
import Cookies from 'js-cookie'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import classes from './MainPage.scss'
import FormPersonal from '../../containers/FormPersonal/FormPersonal'
import FormEmployee from '../../containers/FormEmployee/FormEmployee'
import FormDocument from '../../containers/FormDocument/FormDocument'
import ButtonStart from '../../components/ButtonStart/ButtonStart'
import ButtonFinish from '../../components/ButtonFinish/ButtonFinish'
import ButtonPagenation from '../../components/ButtonPagination/ButtonPagination'
import Loader from '../../components/Loader/Loader'


class MainPage extends Component {
    state = {
        step: 0,
        load: false,
        form1: {
            firstName: '',
            middleName: '',
            lastName: '',
            homePhone: '',
            mobilePhone: '',
            emailAddress: '',
            mailingAddress: '',
            socialSecurityNumber: ''
        },
        form2: {
            employerName: '',
            employerAddress: '',
            workPhone: '',
            jobPosition: '',
        },
        form3: {
            utilityBill: null,
            socialSecurityNumber: null,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('next state', nextState)
        return true
    }

    handleChange = (form) => (value) => (event) => {
        if (form === 1) {
            this.setState({
                form1: {
                    ...this.state.form1,
                    [value]: event.target.value,
                }
            })
        }
        else if (form === 2) {
            this.setState({
                form2: {
                    ...this.state.form2,
                    [value]: event.target.value,
                }
            })
        }
    }

    stepForm = (step) => {
        console.log('1', step)
        switch (step) {
            case 0: return (<ButtonStart clicked={this.buttonClick('start')} />)
            case 1: return (<FormPersonal changed={this.handleChange(1)} value={this.state.form1} />)
            case 2: return (<FormEmployee changed={this.handleChange(2)} value={this.state.form2} />)
            case 3: return (<FormDocument userKey={this.props.userKey} />)
            case 4: return (<ButtonFinish clicked={this.buttonClick('finish')}></ButtonFinish>)
            default: return (<div>full</div>)
        }
    }

    buttonPagination = () => {
        return (
            <div>
                <ButtonPagenation
                    type={"previous"}
                    clicked={this.buttonClick('previous')}
                    disabled={this.state.step === 1} />
                <ButtonPagenation
                    type={"next"}
                    clicked={(event) => this.buttonClick('next')(event)}
                    disabled={this.state.step === 4} />
            </div>
        )
        // () => {this.buttonClick(status)}
    }

    checkFormValid = (form) => {
        let checkForm = true
        Object.keys(form).every((data) => {
            if (form[data] === '') {
                checkForm = false
                return false
            }
            return true
        })
        return checkForm
    }

    buttonClick = (status) => (event) => {
        console.log(event)
        const { form1, form2 } = this.state
        const state = this.state.step
        let checkForm = true
        if (status === 'start') {
            this.setState({ step: state + 1 })
        } else if (status === 'finish') {
            Cookies.remove('key')
            this.props.onClearForm()
            this.setState({ step: 0 })
        }
        else if (status === 'previous') {
            this.setState({ step: state - 1 })
        } else if (status === 'next') {
            if (this.state.step === 1) {
                checkForm = this.checkFormValid(form1)
                if (checkForm) {
                    this.setState({
                        ...this.state,
                        load: true,
                    })
                    // let url
                    if (Cookies.get('key') && Cookies.get('key') != 'undefined') {
                        // url = axios.put(`/form/${Cookies.get('key')}/form1.json`, {
                        //     ...form1
                        // })
                        // url.then(() => {
                        //     this.setState({
                        //         ...this.state,
                        //         step: state + 1,
                        //         load: false,
                        //     })
                        // }).catch(e => console.log(e))
                        this.props.onUpdateForm(state, form1)
                            .then(() => {
                                this.setState({ step: state + 1 })
                            }).catch(e => {
                                console.log('error', e)
                            })
                    } else {
                        // url = axios.post('/form.json', {
                        //     form1
                        // })
                        // url.then((response) => {
                        //     this.setState({
                        //         ...this.state,
                        //         step: state + 1,
                        //         key: response.data.name,
                        //         load: false,
                        //     })
                        //     console.log('response', response)
                        //     Cookies.set('key', response.data.name)
                        // }).catch(e => console.log(e))
                        this.props.onAddForm(state, form1)
                            .then(() => {
                                this.setState({ step: state + 1 })
                            }).catch(e => {
                                console.log('error', e)
                            })
                    }
                }
            }
            else if (this.state.step === 2) {
                checkForm = this.checkFormValid(form2)
                if (checkForm) {
                    this.setState({
                        ...this.state,
                        load: true,
                    })
                    let url
                    if (Cookies.get('key') && Cookies.get('key') != 'undefined') {
                        // url = axios.put(`/form/${Cookies.get('key')}/form2.json`, {
                        //     ...form2
                        // })
                        this.props.onUpdateForm(state, form2)
                            .then(() => {
                                this.setState({ step: state + 1 })
                            }).catch(e => {
                                console.log('error', e)
                            })
                    } else {
                        this.setState({
                            step: 1
                        })
                    }
                    // url.then((response) => {
                    //     this.setState({
                    //         ...this.state,
                    //         step: state + 1,
                    //         load: false,
                    //     })
                    // }).catch(e => console.log(e))
                }
            } else {
                this.setState({ step: state + 1 })
            }
        }
    }

    fileSelectHandler = (file) => (event) => {
        console.log('test', file)
        this.setState({
            ...this.state,
            form3: {
                ...this.state.form3,
                [file]: event.target.files[0],
            }
        }, () => console.log('this.state', this.state))
    }

    render() {
        const { step, load } = this.state
        console.log('asdfasdf', step, this.state)
        return (<Aux>
            {this.props.load && <Loader />}
            <div className={classes.ContentLeft}>
                <div>
                    <h1>Full Stack Developer Scope</h1>
                </div>
            </div>
            <div className={classes.ContentRight}>
                <div className={classes.ContentForm}>
                    {this.stepForm(step)}
                    {step !== 0 ? this.buttonPagination() : null}
                </div>
            </div>
        </Aux>)
    }
}

const mapStateToProps = state => {
    return {
        load: state.load,
        userKey: state.userKey
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddForm: (step, form) => dispatch(actions.addForm(step, form)),
        onUpdateForm: (step, form) => dispatch(actions.updateForm(step, form)),
        onClearForm: () => dispatch(actions.clearForm()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(MainPage)