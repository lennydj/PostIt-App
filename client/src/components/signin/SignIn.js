import React, {PropTypes} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../actions/sessionActions';
//import * as userLogin from '../../actions/loginActions';
import SignInForm from './SignInForm';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: {username:'', password:''}}
        this.updateUserState = this.updateUserState.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
  }


    updateUserState(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
        return this.setState({user: user});
  }
    
    onClickSave(event) {
        event.preventDefault();
        this.props.actions.logInUser(this.state.user);
    }

    render() {
        return (
            <SignInForm 
            user={this.state.user}
            onSave={this.onClickSave}
            onChange={this.updateUserState}/>
        );
    }
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(SignIn);