import React from 'react';

const SideBar = (props) => {
    const { userList, username } = props;

    console.log(userList)

    const myUsersList = userList.map((user)=>{
                return <div className="user-card">{user.username}</div>
    })
    return (
        <div className={props.toggle ? 'sidebar-container' : 'sidebar-container hide'}>
            <h1>
                {props.room}
            </h1>
            <div className="userslist-container">
            <button className='leave-room-button' onClick={() => props.history.push('/')}>
                leave room
            </button>
                {myUsersList}
            </div>
        </div>
    );
};

export default SideBar;