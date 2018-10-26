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
        socket.emit('join', {username: props.username, room: this.props.room.toLowerCase() || props.location.pathname.replace(/\//ig,'').toLowerCase()})

        socket.on('user_id', (id) => {
            console.log(id)
            this.setState({
                id: id
            })
        })

        socket.on('joined', (joined) => {
            this.setState({
                room: joined.room,
                userList: joined.userList,
            })
        })

        socket.on('userlist', (userList) => {
            console.log('asdfsfadsfadsfadsfadfadsfadsfasdfadsfa',userList)
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

    //     window.onbeforeunload = function(event)
    // {
    //     return confirm("Confirm refresh");
    // };
        window.addEventListener("beforeunload", (event) => {
            // Cancel the event as stated by the standard.
            // event.preventDefault();
            socket.emit('left', {room: this.state.room, username: this.state.username, id: this.state.id})
            // // Chrome requires returnValue to be set.
            // event.returnValue = 'Left room';
        });
    }

    componentWillUnmount(){
        socket.emit('left', {room: this.state.room, username: this.state.username, id: this.state.id})
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

    toggleFunc = () => {
        this.setState((prevState) => {
            return {
                toggle: !prevState.toggle
            }
        })
    }
    
    

    render() {
        console.log(this.props)
        return (
            <div className='chat-container'>
                <div>
                    {/* <button className='hamburger' onClick={this.mobileToggle}>{this.state.toggle ? <span>-</span>: <span>+</span>}</button> */}
                    <div onClick={this.toggleFunc} className={this.state.toggle ? 'toggle' : 'toggle showham'}>
                        <div className={this.state.toggle ? 'closes' : 'opens'}>
                            <span className={this.state.toggle ? 'bar close one' : 'bar open one'}></span>
                            <span className={this.state.toggle ? 'bar close two' : 'bar open two'}></span>
                            <span className={this.state.toggle ? 'bar close three' : 'bar open three'}></span>
                        </div>
                    </div>
                    <SideBar toggle={this.state.toggle} mobileToggle={this.mobileToggle} {...this.props} {...this.state} />
                    <ChatRoom changeHandler={this.changeHandler} sendMessage={this.sendMessage} {...this.state} {...this.props} />
                </div>
            </div>  
        );
    }
}

export default withRouter(ChatContainer)