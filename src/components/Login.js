import React, { Component } from 'react';

export default class Login extends Component {
    render() {
        console.log(this.props);
        const {universalChangeHandler, username, submitUsername} = this.props;
        return (
            <div className='login-container'>
                <div>
                    <h1>Enter a username</h1>
                    <input name="userNameSelection" placeholder='Username' onChange={(e)=> universalChangeHandler(e)} value={username} />
                    <button onClick={submitUsername}>Start</button>
                </div>
            </div>
        );
    }
}