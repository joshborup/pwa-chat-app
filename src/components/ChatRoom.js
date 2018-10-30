import React from 'react';
import Dropzone from 'react-dropzone';

const ChatRoom = (props) => {

    let messagesEnd = React.createRef();
    
    function scrollToBottom(){
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }

    const {messages, sendMessage, message} = props;

    const chatMessages = messages.map((user) => {
        let time = new Date(user.timestamp);
        let humanReadableTimestamp = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        console.log('human readable time ', humanReadableTimestamp);
        return <div className='message'>
                    <div key={user.username + humanReadableTimestamp} className='message-username'>{user.username} <span>-{humanReadableTimestamp}</span></div>
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
                <input autoFocus={true} onKeyPress={(e)=> {if(e.key === "Enter" && message) sendMessage(); scrollToBottom();}} name="message" onChange={(e) => props.changeHandler(e.target.name, e.target.value)} value={message}/>
                <button  onClick={() => {
                    console.log('dfgdfgsdfgsdfg',message)
                    if(message){
                        sendMessage()
                        scrollToBottom()
                    }
                    }}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;