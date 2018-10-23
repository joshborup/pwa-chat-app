import React from 'react';

const SideBar = (props) => {
    console.log('sjjdjdjdjjdjdjdjjdjdjdjjdjdj=====',props)
    const { userList } = props;

    console.log('ksk---------------------',userList)
    const myUsersList = userList.map((user)=>{
        return <div>{user.username}</div>
    })
    return (
        <div className={props.toggle ? 'sidebar-container' : 'sidebar-container hide'}>
            <h1>
                {props.room}
            </h1>
            <div>
                {myUsersList}
            </div>
        </div>
    );
};

export default SideBar;