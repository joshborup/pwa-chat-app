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
      username: ''
    }
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

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">
          
        </header>
        <Switch>
          <Route path="/chat-room" render={() => {
            return this.state.username ? <ChatContainer room={this.state.room} username={this.state.username} /> : <Redirect to="/" />;
          }} />
          <Route exact path="/" render={() => {
            return <Login submitUsername={this.submitUsername} username={this.state.userNameSelection} universalChangeHandler={this.universalChangeHandler} />
          }}/>

          <Route path="*" render={() => {
            return <Login submitUsername={this.submitUsername} username={this.state.userNameSelection} universalChangeHandler={this.universalChangeHandler} />
          }}/>

        </Switch>
      
      </div>
    );
  }
}

export default withRouter(App);
