import React from 'react';


const ChatRoom = (props) => {

    const {messages, sendMessage, message} = props;

    const chatMessages = messages.map((user) => {
        return <div>
                    <span>{user.username}</span>:
                    <span>{' ' + user.message}</span>
                </div>
    })
    return (
        <div className='main-room-container'>
            <div className='messages-container'>
                {chatMessages}
            </div>
            <div className='input-containers'>
                <input onKeyPress={(e)=> {if(e.key === "Enter") sendMessage()}} name="message" onChange={(e) => props.changeHandler(e.target.name, e.target.value)} value={message}/>
                <button  onClick={sendMessage}>send</button>
            </div>
        </div>
    );
};

export default ChatRoom;