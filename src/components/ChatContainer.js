import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import ChatRoom from './ChatRoom';
import SideBar from './SideBar';
import {withRouter} from 'react-router-dom'
let socket = socketIOClient();


class ChatContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            toggle: false,
            username: this.props.username,
            userList: [],
            message: '',
            messages: [],
        }
        socket.emit('join', {username: props.username, room: this.props.room.toLowerCase() || props.location.pathname.replace(/\//ig,'').toLowerCase()})

        socket.on('user_id', (id) => {
            this.props.getId(id)
        })

        socket.on('joined', (joined) => {
            this.setState({
                room: joined.room,
                userList: joined.userList,
            })
        })

        socket.on('userlist', (userList) => {
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
            this.countdown = setInterval(this.reconnect, 10000);
            this.cleanup = setInterval(this.userListCleanup, 1000);

        window.addEventListener("beforeunload", (event) => {
            socket = socketIOClient();
            socket.emit('left', {room: this.state.room, username: this.state.username, id: this.props.id})
        });
    }

    componentWillUnmount(){
        clearInterval(this.countdown);
        clearInterval(this.cleanup)
        socket.emit('left', {room: this.state.room, username: this.state.username, id: this.props.id})
    }


    userListCleanup = () => {
        socket.emit('userlist-cleanup', {username: this.props.username, id: this.props.id, room: this.props.room.toLowerCase()})        
    }

    reconnect = () => {
        if(socket.disconnected){
            const reconnect = window.confirm("You have been disconnected, would you like to reconnect?");
            if(reconnect){
                socket.emit('join', {username: this.props.username, id: this.props.id, room: this.props.room.toLowerCase()})
            }else{
                this.props.history.push('/')
            }
        }
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
        if(this.state.message){
            this.setState(() => {
                socket.emit('message', {id: this.props.id, room: this.state.room, username: this.state.username, message: this.state.message})
                return {
                    message: ''
                }
            })
        }
    }

    toggleFunc = () => {
        this.setState((prevState) => {
            return {
                toggle: !prevState.toggle
            }
        })
    }
    
    

    render() {
        return (
            <div className='chat-container'>
                <div>
                    <div onClick={this.toggleFunc} className={this.state.toggle ? 'toggle' : 'toggle showham'}>
                        <div className={this.state.toggle ? 'closes' : 'opens'}>
                            <span className={this.state.toggle ? 'bar close one' : 'bar open one'}></span>
                            <span className={this.state.toggle ? 'bar close two' : 'bar open two'}></span>
                            <span className={this.state.toggle ? 'bar close three' : 'bar open three'}></span>
                        </div>
                    </div>
                    <SideBar toggleFullScreen={this.props.toggleFullScreen} toggle={this.state.toggle} mobileToggle={this.mobileToggle} {...this.props} {...this.state} />
                    <ChatRoom changeHandler={this.changeHandler} sendMessage={this.sendMessage} {...this.state} {...this.props} />
                </div>
            </div>  
        );
    }
}

export default withRouter(ChatContainer)