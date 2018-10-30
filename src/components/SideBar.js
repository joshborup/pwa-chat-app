import React, { PureComponent } from 'react';
import exit from './exit.svg'
import fullscreen from './fullscreen.svg'

export default class SideBar extends PureComponent {

    state = {
        fullScreen: false
    }
    
    toggleFunc = () => {
        this.setState((prevState) => {
            this.props.toggleFullScreen();
            return {
                fullScreen: !prevState.fullScreen
            }
        })
    }

    render(){
        const { userList, username } = this.props;
        const myUsersList = userList.map((user)=>{
                    return <div key={user.id} className="user-card">{user.username}</div>
        })

        return (
            <div className={this.props.toggle ? 'sidebar-container' : 'sidebar-container hide'}>
                <h1>
                    {this.props.room}
                </h1>
                <div className="userslist-container">
                <button className='leave-room-button' onClick={() => this.props.history.push('/')}>
                    Leave Room
                </button>
                    {myUsersList}
                <button className='fullscreen' onClick={() => this.toggleFunc()}>
                    {this.state.fullScreen ? <img src={exit} /> : <img src={fullscreen} />}
                </button>
                </div>
            </div>
        );
    };
}
