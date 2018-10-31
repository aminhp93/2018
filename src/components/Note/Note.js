import React from 'react';
import axios from 'axios'
import { getAllNotesUrl, getUpdateNoteUrl } from '../../helpers/requests';

export default class Note extends React.Component {
    constructor(props) {
        super(props);
    }

    handleOnChange(e) {
        console.log('press', e.target.value, this.input)
        const obj = { 'note': e.target.value }
        const url = getUpdateNoteUrl()
        axios.post(url, obj)
            .then(response => {
                console.log(response)
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
        this.input && this.input.focus()
        const url = getAllNotesUrl()
        axios.get(url)
            .then(response => {
                console.log(response)
                if (response.data) {
                    this.input.value = response.data.note
                }

            })
            .catch(error => {
                console.log(error)
            })
    }
}