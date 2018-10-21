import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import ChatRoom from './ChatRoom';
import SideBar from './SideBar';
import {withRouter} from 'react-router-dom'
const socket = socketIOClient();

class ChatContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            room: '',
            toggle: false,
            username: '',
        }
        socket.emit('join', {username: props.username, room: props.location.pathname.replace(/\//ig,'').toLowerCase()})

        socket.on('joined', (joined) => {
            this.setState({
                room: joined.room,
                username: joined.username
            })
        })

        socket.on('message', (message) => {
            console.log(message)
        })
    }

    mobileToggle = () => {
        this.setState((prevProps) => {
            return {
                toggle: !prevProps.toggle
            }
        })
    }

    sendMessage = () => {
        socket.emit('message', {room: this.state.room, username: this.state.username, message: 'djdjdjdjjdjdjdj'})
    }

    render() {
        console.log(this.props.location.pathname.replace(/\//ig,'').toLowerCase())
        return (
            <div className='chat-container'>
                <div>
                    <button className='hamburger' onClick={this.mobileToggle}>{this.state.toggle ? <span>-</span>: <span>+</span>}</button>
                    <SideBar toggle={this.state.toggle} mobileToggle={this.mobileToggle} {...this.props} {...this.state} />
                    <ChatRoom {...this.state} {...this.props} />
                </div>
            </div>  
        );
    }
}

export default withRouter(ChatContainer)