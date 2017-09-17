import React from 'react';
import {Link, IndexLink } from 'react-router-dom';

// class SignIn extends React.Component {
    // render() {
      //  return (
const Header = () => (
    <nav>
        <IndexLink to="/" activeClassName="active">SignIn</IndexLink>
        {" | "}
        <Link to ="signup" activeClassName="active">Signup</Link>
    </nav>
        );
   // } 
// }

export default Header;