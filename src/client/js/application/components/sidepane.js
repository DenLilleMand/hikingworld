import React from 'react';
import io from 'socket.io-client';
import Message from './message';
import _ from 'lodash';

export default class SidePane extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            socket: null,
            users: [],
            messages: [],
            currentUser:null
        };
        this._addChatMessage = this._addChatMessage.bind(this);
    }

    componentDidMount() {
        var socket = io('/');
        this.setState({
            socket
        });

        socket.on("initial", (data) => {
            console.log('data received on the client when joining:', data);
            this.setState({
                users: data.users,
                messages: data.messages,
                currentUser: data.currentUser
            });
        });

        socket.on('message', (data) => {
            console.log('message received on client!', data);
            this._addChatMessage(data.text, data.user, new Date());
        });
    }


    _addChatMessage(text, user, timestamp) {
        var messages = this.state.messages.slice();
        messages.push({text:text, user: user, timestamp: timestamp});
        this.setState({
            messages:messages
        });
    }

    render() {
        let messages = this.state.messages;
        let users = this.state.users;
        return(
            <div className="facebook-wall-sidepane">
                <div className="col-md-12">
                    <h3>Users online:</h3>
                    <ul>
                    {this.state.users.map((user) => {
                        return(
                            <li>{user}</li>
                        );
                    })}
                    </ul>
                </div>
                <div className="col-md-12">
                <h3>Chat</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td>Message</td>
                            <td>timestamp</td>
                        </tr>
                        {messages.map((message) => {
                            return(
                                <tr>
                                    <td>{message.user}</td>
                                    <td>{message.text}</td>
                                    <td>{message.timestamp.toString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <input value={this.state.chatMessage}
                       onChange={(event) => {this.setState({chatMessage: event.target.value})}}
                       type="text" />
                <input className="btn btn-primary" onClick={(event) => {
                    this.state.socket.emit("message", {text: this.state.chatMessage});
                    this._addChatMessage(this.state.chatMessage, this.state.currentUser, new Date());
                    this.setState({
                        chatMessage: ""
                    });
                }} type="submit" />
                    </div>
            </div>
        );
    }
}
SidePane.propTypes = {

};
