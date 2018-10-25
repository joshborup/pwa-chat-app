import React from 'react';

const ChatRoom = (props) => {

    let messagesEnd = React.createRef();
    
    function scrollToBottom(){
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }

    const {messages, sendMessage, message} = props;

    const chatMessages = messages.map((user) => {
        return <div className='message'>
                    <div className='message-username'>{user.username} <span>-{user.timestamp}</span></div>
                    <div className='message-content'>{' ' + user.message}</div>
                </div>
    })
    return (
        <div className='main-room-container'>
            <div className='messages-container'>
                {chatMessages}
                <div className='spacer' ref={messagesEnd}></div>
            </div>
            <div className='input-containers'>
                <input autoFocus={true} onKeyPress={(e)=> {if(e.key === "Enter") sendMessage(); scrollToBottom();}} name="message" onChange={(e) => props.changeHandler(e.target.name, e.target.value)} value={message}/>
                <button  onClick={() => {
                    sendMessage()
                    scrollToBottom()
                    }}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;