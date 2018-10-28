import React, { Component } from 'react';

export default class Login extends Component {
    render() {
        const {universalChangeHandler, username, submitUsername, room} = this.props;
        return (
            <div className='login-container'>
                <div>
                    <h1>Enter a username</h1>
                    <input autoFocus={true} onKeyPress={(e)=> {if(e.key === "Enter") submitUsername()}} name="userNameSelection" placeholder='Username' onChange={(e)=> universalChangeHandler(e)} value={username} />
                    <input onKeyPress={(e)=> {if(e.key === "Enter") submitUsername()}} name="room" placeholder="room" onChange={(e)=> universalChangeHandler(e)} value={room} />
                    <button onClick={submitUsername}><span>S</span><span>t</span><span>a</span><span>r</span><span>t</span></button>
                </div>
            </div>
        );
    }
}