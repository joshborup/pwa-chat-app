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
            username: this.props.username,
            userList: [],
            message: '',
            messages: [],
            id:null
        }
        socket.emit('join', {username: props.username, room: props.location.pathname.replace(/\//ig,'').toLowerCase()})

        socket.on('joined', (joined) => {
            console.log('joined==================', joined)
            this.setState({
                room: joined.room,
                id: joined.id,
                userList: joined.userList,
            })
        })

        socket.on('userlist', (userList) => {
            console.log(userList)
            this.setState({
                userList: userList,
            })
        })

        socket.on('message', (message) => {
            this.setState({
                messages: [...this.state.messages, message]
            })
        })
    }

    componentDidMount(){
        window.addEventListener("beforeunload", (event) => {
            socket.emit('left', {room: this.state.room, username: this.state.username, id: this.state.id})
            // Cancel the event as stated by the standard.
            event.preventDefault();
            // Chrome requires returnValue to be set.
            event.returnValue = 'Left room';
        });
    }

    changeHandler = (name, value) => {
        this.setState({
            [name]: value
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
        this.setState(() => {
            socket.emit('message', {id: this.state.id, room: this.state.room, username: this.state.username, message: this.state.message})
            return {
                message: ''
            }
        })
    }

    render() {
        console.log(this.props.location.pathname.replace(/\//ig,'').toLowerCase())
        return (
            <div className='chat-container'>
                <div>
                    <button className='hamburger' onClick={this.mobileToggle}>{this.state.toggle ? <span>-</span>: <span>+</span>}</button>
                    <SideBar toggle={this.state.toggle} mobileToggle={this.mobileToggle} {...this.props} {...this.state} />
                    <ChatRoom changeHandler={this.changeHandler} sendMessage={this.sendMessage} {...this.state} {...this.props} />
                </div>
            </div>  
        );
    }
}

export default withRouter(ChatContainer)