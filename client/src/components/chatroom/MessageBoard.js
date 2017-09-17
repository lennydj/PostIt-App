import React from 'react';
import { Link } from 'react-router-dom';

const MessageBoard = ({user, group, message, onChange, onSave}) => {

    return (

        <div className="container-fluid">
        <div className="row content">
        <div className="col-sm-3 sidenav">
        <div className="side-menu">
          <h1 className="icon-text">PostIt</h1>
          <ul className="nav nav-pills nav-stacked">
            <div className="dropdown">
              <button className="btn dropdown-toggle btn-info active" type="button" data-toggle="dropdown">Helen J
                <span className="caret"></span></button>
                <ul className="dropdown-menu">
                  <li><a href="#">Status</a></li>
                  <li><a href="#">Profile</a></li>
                  <li><a href="#">Settings</a></li>
                  <li><a href="#">Logout</a></li>
                </ul>
              </div>
              <p></p>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Find a Group.." 
                value={user.group} onChange={onChange} />
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">
                    <span className="glyphicon glyphicon-search"></span>
                  </button>
                </span>
              </div><br/>
            </ul><br/>
          </div>
        </div>
        <div className="col-sm-9">
          <div className="row">
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="icon-bar">
                  <a className="active" href="goup-message.html"><i className="fa fa-commenting"></i></a> 
                  <a href="Invite-to-join.html"><i className="fa fa-user-plus"></i></a> 
                  <a href="New%20Invite.html"><i className="fa fa-bell"></i></a> 
                  <a href="New%20Group.html"><i className="fa fa-plus"></i></a>
                  <a href="#"><i className="fa fa-bars"></i></a> 
                </div>
              </div>
            </nav>

            <div className="container-fluid">             
              <form name="message" action=""> 
               <div className="message_write">
                 <textarea className="form-control" value={user.message} placeholder="Type your message..."></textarea>
                 <div className="clearfix"></div>
                 <div className="chat_bottom"><a href="#" className="pull-left upload_btn" onClick={onSave}>
                     <i className="fa fa-cloud-upload" aria-hidden="true"></i>
                   Add Files</a>
                   <a href="#" className="pull-right btn btn-info active">
                     Send</a></div>
                   </div>
                   </form>
                 </div>
               </div>
             </div>
           </div>
        </div>
    );
};
    
MessageBoard.propTypes = {
    user: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired
}

export default MessageBoard;