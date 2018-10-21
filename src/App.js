import React, { Component } from 'react';
import './App.scss';
import ChatContainer from './components/ChatContainer';
import Login from './components/Login'


class App extends Component {
  constructor(){
    super()
    this.state = {
      userNameSelection: '',
      username: ''
    }
  }
  
  universalChangeHandler = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  submitUsername = () => {
    this.setState({
      username: this.state.userNameSelection
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          
        </header>
        {
        this.state.username ? 
        <ChatContainer username={this.state.username} />
        :
        <Login submitUsername={this.submitUsername} username={this.state.userNameSelection} universalChangeHandler={this.universalChangeHandler} />
        } 
      </div>
    );
  }
}

export default App;
