import React, {PropTypes} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../actions/sessionActions';
import SignUpForm from './SignUpForm';


class SignUp extends React.Component {
     constructor(props) {
        super(props);
        this.state = {newuser: {username:'', password:'', email:'', phonenumber:''}}
        this.updateUserState = this.updateUserState.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
  }

    updateUserState(event) {
        const field = event.target.name;
        const newuser = this.state.newuser;
        newuser[field] = event.target.value;
        return this.setState({newuser: newuser});
  }
    
    onClickSave(event) {
        event.preventDefault();
        this.props.actions.signUpUser(this.state.newuser);
        debugger;
    }

    render() {
        return (
            <SignUpForm 
            newuser={this.state.newuser}
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

export default connect(null, mapDispatchToProps)(SignUp);