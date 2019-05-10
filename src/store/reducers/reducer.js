import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    userKey: '',
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
    }
};

const addFormStart = (state, action) => {
    return updateObject(state, { load: true })
}

const addFormSuccess = (state, action) => {
    return updateObject(state, {
        userKey: action.userKey,
        [action.formContent]: action.form,
        load: false
    })
}

const addFormFail = (state, action) => {
    return updateObject(state, { load: false })
}

const updateFormStart = (state, action) => {
    return updateObject(state, { load: true })
}

const updateFormSuccess = (state, action) => {
    return updateObject(state, {
        userKey: action.userKey,
        [action.formContent]: action.form,
        load: false
    })
}

const updateFormFail = (state, action) => {
    return updateObject(state, { load: false })
}

const clearForm = (state, action) => {
    console.log('state', state)
    return updateObject(state, state)
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_FORM_START: return addFormStart(state, action)
        case actionTypes.ADD_FORM_SUCCESS: return addFormSuccess(state, action)
        case actionTypes.ADD_FORM_FAIL: return addFormFail(state, action)
        case actionTypes.UPDATE_FORM_START: return updateFormStart(state, action)
        case actionTypes.UPDATE_FORM_SUCCESS: return updateFormSuccess(state, action)
        case actionTypes.UPDATE_FORM_FAIL: return updateFormFail(state, action)
        case actionTypes.CLEAR_FORM: return clearForm(initialState, action)
        default:
            return state;
    }
}

export default reducer