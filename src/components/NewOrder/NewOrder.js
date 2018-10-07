import React from 'react';
import { getHeaderRequest, getAccountNewOrderRequestUrl } from '../../helpers/requests';
import dataStorage from '../../dataStorage';
import axios from 'axios';

export default class NewOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                NewOrder
            </div>
        );
    }

    componentDidMount() {
        let url = getAccountNewOrderRequestUrl()
        const data = { "orderType": "LO", "price": 1000, "quantity": 1, "side": "NB", "symbol": "VIC", "expiredDate": "2018-10-06T17:45:03.331Z", "term": "T", "forcedSell": false }
        axios.post(url, data, getHeaderRequest())
            .then(response => {
                if (response.data) {
                    this.setState({
                        accountAssetsObj: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });

    }
}