import React from 'react';
import { getAccountManagementUrl } from '../../helpers/requests';
import dataStorage from '../../dataStorage';
import axios from 'axios';

export default class AccountManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountManagementObj: {}
        }
    }

    renderContent() {
        let result = []
        for (let key in this.state.accountManagementObj) {
            result.push(<div key={key}>
                {key}: {this.state.accountManagementObj[key]}
            </div>)
        }
        return result

    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }

    componentDidMount() {
        const url = getAccountManagementUrl()
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'X-Auth-Token': dataStorage.accessToken
            }
        };
        axios.get(url, headers)
            .then(response => {
                console.log(response)
                if (response.data) {
                    this.setState({
                        accountManagementObj: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }
}