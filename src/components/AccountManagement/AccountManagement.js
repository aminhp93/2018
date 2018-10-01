import React from 'react';
import { getAccountManagement } from '../../helpers/requests';
import dataStorage from '../../dataStorage';
import axios from 'axios';

export default class AccountManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountManagementObj: {}
        }
    }

    render() {
        return (
            <div>
                AccountManagement: {this.state.accountManagementObj.netAssetValue}
            </div>
        );
    }

    componentDidMount() {
        const url = getAccountManagement()
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