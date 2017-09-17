import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as sendMessageActions from '../../actions/sessionActions';
import MessageBoard from './MessageBoard';

class ManageMessageBoard extends React.Component {
    constructor(props, context) {
        super(props,context);

        this.state = {
            user: Object.assign({}, props.user)
        };

        this.updateUserState = this.updateUserState.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    updateUserState(event) {
        const field = event.target.name;
        let user=this.state.user;
        user[field]= event.target.value;
        return this.setState({user: user });
    }
    
    onClickSave(event) {
        this.props.actions.loginAction(this.state.user);
        event.preventDefault();
    }

    render() {
        return (
            <MessageBoard 
            user={this.state.user}
            onSave={this.onClickSave}
            onChange={this.updateUserState}/>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        signuserin: state.signuserin
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(sendMessageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageMessageBoard);