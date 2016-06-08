import React from 'react';
import io from 'socket.io-client';

export default class SidePane extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            socket: null,
            messages: [],
            users: []
        };
    }

    componentDidMount() {
        var socket = io('/');
        this.setState({
            socket
        });

        socket.emit("herpderp", { herpderp: "okay"});
    }


    /** Laver sidepane om til en chat */
    render() {
        return(
            <div className="facebook-wall-sidepane">
                sidepane




            </div>
        );
    }
}
SidePane.propTypes = {

};
