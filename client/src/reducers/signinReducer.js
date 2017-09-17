import * as types from '../actions/actionTypes';

export default function signinReducer(state = [], action) {
  switch (action.type) {
    case types.SIGNIN_USER:
      return [...state,
        Object.assign({}, action.user)
      ];
    default:
      return state;
  }
}

