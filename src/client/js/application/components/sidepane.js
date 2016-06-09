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
            messages: []
        };
    }

    componentDidMount() {
        var socket = io('/');
        this.setState({
            socket
        });

        socket.on("initial", (data) => {
            console.log('data received on the client when joining:', data);
            debugger;
            this.setState({
                users: data.users,
                messages: data.messages
            });
        });
    }

    render() {
        let messages = this.state.messages;
        debugger;
        return(
            <div className="facebook-wall-sidepane">
                <h3>Chat</h3>
                <table>
                    {messages.map((message) => {
                        return(
                            <tr>
                                <td>{message.user}</td>
                                <td>{message.text}</td>
                                <td>{message.timestamp}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        );
    }
}
SidePane.propTypes = {

};
