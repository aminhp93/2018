import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class Chat extends Component {
    constructor() {
        super();
        this.state = {
            response: false,
            endpoint: "http://127.0.0.1:4001"
        };
    }
    componentDidMount() {
    }

    handleOnClick() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.emit('message', this.input.value);
        this.input.value = ''
        socket.on("message", response => {
            this.setState({ response })
        });

    }
    render() {
        const { response } = this.state;
        return (
            <div style={{ textAlign: "center" }}>
                {
                    response
                }
                <div>
                    <input ref={dom => this.input = dom} />
                    <div onClick={() => this.handleOnClick()}>Send</div>
                </div>
            </div>
        );
    }
}
export default Chat;