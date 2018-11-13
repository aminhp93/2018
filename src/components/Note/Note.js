import React from 'react';
import axios from 'axios'
import { getAllNotesUrl, getUpdateNoteUrl } from '../../helpers/requests';
import socketIOClient from "socket.io-client";
import config from './../../config'
export default class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: false,
            endpoint: config.environment === 'TEST' ? "http://127.0.0.1:4001" : 'https://project-2018-frontend.herokuapp.com/note'
        };
    }

    handleOnChange(e) {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        const obj = { 'note': e.target.value }
        const url = getUpdateNoteUrl()
        axios.post(url, obj)
            .then(response => {
                console.log(response)
                socket.emit('message', this.input.value);
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div className='note'>
                <textarea ref={input => this.input = input} onChange={this.handleOnChange.bind(this)} />
            </div>
        );
    }

    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        const that = this
        socket.on("message", response => {
            that.input.value = response
        });
        this.input && this.input.focus()
        const url = getAllNotesUrl()
        axios.get(url)
            .then(response => {
                if (response.data) {
                    this.input.value = response.data.note

                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}