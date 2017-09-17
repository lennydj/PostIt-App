import React from 'react';


const SignInForm = ({ newuser, username, password, email, phonenumber, onChange, onSave }) => {

  return (
    <main className="form-body">
      <div className="container-fluid">
        <form className="login-form">
          <fieldset className="account-info">
            <h1 className="text-center">PostIt</h1>
            <h3 className="text-center">Welcome Back!</h3>
            <input
              type="text"
              className="form-control text-opacity"
              name="username"
              placeholder="Enter Username"
              value={newuser.username}
              onChange={onChange}
              //error={errors.username}
              required />
            <p></p>
            <input type="password"
              className="form-control text-opacity"
              name="password"
              placeholder="Enter Password"
              value={newuser.password}
              onChange={onChange}
              //error={errors.password}
              required />
            <p></p>
            <input
              type="email"
              className="form-control text-opacity"
              name="email"
              placeholder="Enter Email"
              value={newuser.email}
              onChange={onChange}
              //error={errors.username}
              required />
            <p></p>
            <p></p>
            <input
              type="text"
              className="form-control text-opacity"
              name="phonenumber"
              placeholder="Enter Phone Number"
              value={newuser.phonenumber}
              onChange={onChange}
              //error={errors.username}
              required />
            <p></p>
            <a href="goup-message.html" type="submit"
              className="btn btn-primary" onClick={onSave}><i className="fa fa-paper-plane"></i> Submit</a>
            <a href="#">Invite A Friend</a>
          </fieldset>
        </form>
      </div>
    </main>
  );
};

SignInForm.propTypes = {
  newuser: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired
}

export default SignInForm;