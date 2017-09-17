
import { actions as toastrActions } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';
import history from '../history';
import * as types from './actionTypes';


export function loginSuccess(response) {
  return dispatch => {
    dispatch({ response, type: types.LOG_IN_SUCCESS });
    history.push('/messageboard');
    const toastr = bindActionCreators(toastrActions, dispatch);
    toastr.add({
      id: 'USER_SIGNEDIN',
      type: 'success',
      title: 'Success',
      message: 'Welcome Onboard!',
      timeout: 5000,
    });
    setTimeout(() => { toastr.remove('USER_SIGNEDIN'); }, 3500);
  };
}

export function loginFailed() {
  return dispatch => {
    const toastr = bindActionCreators(toastrActions, dispatch);
    toastr.add({
      id: 'INCORRECT_CREDENTIALS',
      type: 'error',
      title: 'Error',
      message: 'Your username/password is incorrect, Please retry with the correct details',
      timeout: 5000,
    });
    setTimeout(() => { toastr.remove('INCORRECT_CREDENTIALS'); }, 3500);
  };
}

export function loginError(error) {
  return { error, type: types.LOG_IN_ERROR };
}

export function signupSuccess(response) {
  return dispatch => {
    dispatch({ response, type: types.SIGN_UP_SUCCESS });
    history.push('/messageboard');
    const toastr = bindActionCreators(toastrActions, dispatch);
    toastr.add({
      id: 'USER_LOGGEDIN',
      type: 'success',
      title: 'Success',
      message: 'Login Successful. Welcome back!',
      timeout: 5000,
    });
    setTimeout(() => { toastr.remove('USER_LOGGEDIN'); }, 3500);
  };
}

export function signupFailed() {
  return dispatch => {
    const toastr = bindActionCreators(toastrActions, dispatch);
    toastr.add({
      id: 'INCORRECT_DETAILS',
      type: 'error',
      title: 'Error',
      message: 'Your username/password is incorrect, Please retry with the correct details',
      timeout: 5000,
    });
    setTimeout(() => { toastr.remove('INCORRECT_DETAILS'); }, 3500);
  };
}


export function logInUser(user) {
  return dispatch =>
    fetch('http://localhost:8000/api/user/signin', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          sessionStorage.setItem('jwt', response.usertoken);
          dispatch(loginSuccess(response));
        } else if (response.status === 400) {
          const error = new Error(response.statusText);
          error.response = response;
          dispatch(loginFailed(error));
        } else {
          const error = new Error(response.statusText);
          error.response = response;
          dispatch(loginError(error));
          throw error;
        }
      })
      .catch(error => { throw error; });
}

export function signUpUser(newuser) {
  return dispatch =>
    fetch('http://localhost:8000/api/user/signup', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: newuser.username,
        password: newuser.password,
        email: newuser.email,
        phonenumber: newuser.phonenumber,
      }),
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          sessionStorage.setItem('jwt', response.usertoken);
          dispatch(signupSuccess(response));
        } else if (response.status === 400) {
          const error = new Error(response.statusText);
          error.response = response;
          dispatch(signupFailed(response));
        } else {
          const error = new Error(response.statusText);
          error.response = response;
          dispatch(loginError(error));
          throw error;
        }
      })
      .catch(error => { throw error; });
}

