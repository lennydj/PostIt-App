import React from 'react';
import { Link } from 'react-router-dom';

const SignInForm = ({ user, username, password, onChange, onSave }) => {

    return (
        <main className="form-body">
            <div className="container-fluid">
                <div className="row content">
                    <div className="col-sm-3">
                        <form className="login-form">
                            <fieldset className="account-info">
                                <h1 className="text-center">PostIt</h1>
                                <h3 className="text-center">Welcome Back!</h3>
                                <input
                                    type="text"
                                    className="form-control text-opacity"
                                    name="username"
                                    placeholder="Enter Username"
                                    value={user.username}
                                    onChange={onChange}
                                    //error={errors.username}
                                    required />
                                <p></p>
                                <input type="password"
                                    name="password"
                                    className="form-control text-opacity"
                                    placeholder="Enter Password"
                                    value={user.password}
                                    onChange={onChange}
                                    //error={errors.password}
                                    required />
                                <p></p>
                                <input type="submit"
                                    value= "Submit"
                                    className="btn btn-primary" onClick={onSave}/>
                                <div className="row">
                                    <Link to='/messageboard'>Forgot password?</Link>
                                    <Link to='/signup'>Register</Link>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

SignInForm.propTypes = {
    user: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired
}

export default SignInForm;