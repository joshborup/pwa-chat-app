import React from 'react';

const SideBar = (props) => {
    return (
        <div className={props.toggle ? 'sidebar-container' : 'sidebar-container hide'}>
            <h1>
                {props.room}
            </h1>
            <div>
                {props.username}
            </div>
        </div>
    );
};

export default SideBar;