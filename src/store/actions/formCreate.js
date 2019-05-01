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

const addFormSuccess = (formContent, form, key) => {
    return {
        type: actionTypes.ADD_FORM_SUCCESS,
        formContent,
        form,
        key,
    }
}

const updateFormSuccess = (formContent, form, key) => {
    return {
        type: actionTypes.UPDATE_FORM_SUCCESS,
        formContent,
        form,
        key,
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
    dispatch(updateFormStart())
    return new Promise((resolve, reject) => {
        axios.put(`/form/${Cookies.get('key')}/${formContent}.json`, {
            ...form
        }).then(response => {
            dispatch(updateFormSuccess(formContent, form, response.data.name))
            resolve()
        }).catch(e => {
            dispatch(updateFormFail())
            reject()
        })
    })
}
