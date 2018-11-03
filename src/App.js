import React, { Component } from 'react';
import './App.scss';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import ChatContainer from './components/ChatContainer';
import Login from './components/Login'


class App extends Component {
  constructor(){
    super()
    this.state = {
      userNameSelection: '',
      username: '',
      savedRoom: null,
      id:null
    }

  }


  componentDidMount(){

    let savedRoom = JSON.parse(localStorage.getItem('room')) || this.props.room;
    if(savedRoom){
      this.setState({
        room: savedRoom.room,
        remember: savedRoom.remember
      })
    }

    let deferredPrompt;

  

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can add to home screen
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
    });
  }

  getId = (id) => {
    this.setState({
      id: id
    })
  }

  rememberRoom = () => {
    localStorage.clear();
    localStorage.setItem('room', JSON.stringify({room: this.state.room, remember:true}))
    this.setState({
      remember:true
    })
  }
  clearStateRemember = () => {
    this.setState({
      remember: false
    })
  }
  universalChangeHandler = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  submitUsername = () => {
    if(this.state.room && this.state.userNameSelection){
      this.setState({
        username: this.state.userNameSelection
      }, this.props.history.push('/chat-room'))
    }
  }

  //put desktop in fullscreenmode
  toggleFullScreen = () => {
    var doc = window.document;
    var docEl = doc.documentElement;
  
    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
  
    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
    }
    else {
      cancelFullScreen.call(doc);
    }
  }

  render() {

    console.log(this.state.room);
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <Switch>
          <Route path="/chat-room" render={() => {
            return this.state.username ? <ChatContainer id={this.state.id} getId={this.getId} toggleFullScreen={this.toggleFullScreen} room={this.state.room} username={this.state.username} /> : <Redirect to="/" />;
          }} />
          <Route exact path="/" render={() => {
            return <Login clearStateRemember={this.clearStateRemember} remember={this.state.remember} rememberRoom={this.rememberRoom} room={this.state.room} submitUsername={this.submitUsername} username={this.state.userNameSelection} universalChangeHandler={this.universalChangeHandler} />
          }}/>

          <Route path="*" render={() => {
            return <Login clearStateRemember={this.clearStateRemember} remember={this.state.remember} rememberRoom={this.rememberRoom} room={this.state.room} submitUsername={this.submitUsername} username={this.state.userNameSelection} universalChangeHandler={this.universalChangeHandler} />
          }}/>

        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
