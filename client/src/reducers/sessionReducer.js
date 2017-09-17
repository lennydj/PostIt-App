//import { browserHistory } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';
import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function sessionReducer(state = initialState.session, action) {
  switch (action.type) {
    case types.LOG_IN_SUCCESS:
      return !!sessionStorage.jwt;
    case types.LOG_IN_FAILED:
      return { error: action.error };
    case types.LOG_IN_ERROR:
      return { error: action.error };
    case types.SIGN_UP_SUCCESS:
      return !!sessionStorage.jwt;
    default:
      return state;
  }
}
