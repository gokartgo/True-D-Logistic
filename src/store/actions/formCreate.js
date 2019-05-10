import * as actionTypes from './actionTypes'
import Cookies from 'js-cookie'
import axios from '../../../axios'

const addFormStart = () => {
    return {
        type: actionTypes.ADD_FORM_START
    }
}


const updateFormStart = () => {
    return {
        type: actionTypes.UPDATE_FORM_START
    }
}

const addFormSuccess = (formContent, form, userKey) => {
    return {
        type: actionTypes.ADD_FORM_SUCCESS,
        formContent,
        form,
        userKey,
    }
}

const updateFormSuccess = (formContent, form, userKey) => {
    return {
        type: actionTypes.UPDATE_FORM_SUCCESS,
        formContent,
        form,
        userKey,
    }
}

const addFormFail = () => {
    return {
        type: actionTypes.ADD_FORM_FAIL
    }
}

const updateFormFail = () => {
    return {
        type: actionTypes.UPDATE_FORM_FAIL
    }
}

export const addForm = (step, form) => dispatch => {
    let formContent = `form${step}`
    dispatch(addFormStart())
    return new Promise((resolve, reject) => {
        axios.post('/form.json', {
            [formContent]: form
        }).then(response => {
            dispatch(addFormSuccess(formContent, form, response.data.name))
            Cookies.set('key', response.data.name)
            resolve()
        }).catch(e => {
            dispatch(addFormFail())
            reject()
        })
    })
}


export const updateForm = (step, form) => dispatch => {
    let formContent = `form${step}`
    const userKey = Cookies.get('key')
    dispatch(updateFormStart())
    console.log('testtest1')
    return new Promise((resolve, reject) => {
        console.log('testtest2')
        axios.put(`/form/${userKey}/${formContent}.json`, {
            ...form
        }).then(response => {
            console.log('response ', response)
            dispatch(updateFormSuccess(formContent, form, userKey))
            resolve()
        }).catch(e => {
            console.log('error', e)
            dispatch(updateFormFail())
            reject()
        })
    })
}

export const clearForm = () => dispatch => {
    dispatch({
        type: actionTypes.CLEAR_FORM,
    })
}
