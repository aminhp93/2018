import React from 'react';
import { getAccountAssetsUrl, getAccountLoanUrl, getAccountPortfolioUrl, getHeaderRequest } from '../../helpers/requests';
import dataStorage from '../../dataStorage';
import axios from 'axios';

export default class AccountManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountAssetsObj: {},
            accountLoanObj: {},
            accountPortfolioObj: {}
        }
    }

    renderAccountAssetsContent() {
        let result = []
        for (let key in this.state.accountAssetsObj) {
            result.push(<div key={key}>
                {key}: {this.state.accountAssetsObj[key]}
            </div>)
        }
        return result
    }

    renderAccountLoanContent() {
        let result = []
        for (let key in this.state.accountLoanObj) {
            result.push(<div key={key}>
                {key}: {this.state.accountLoanObj[key]}
            </div>)
        }
        return result
    }

    renderAccountPortfolioContent() {
        let result = []
        for (let key in this.state.accountPortfolioObj) {
            if (key !== 'stocks') {
                result.push(<div key={key}>
                    {key}: {this.state.accountPortfolioObj[key]}
                </div>)
            }

        }
        return result
    }

    render() {
        return (
            <div>
                {this.renderAccountAssetsContent()}
                {this.renderAccountLoanContent()}
                {this.renderAccountPortfolioContent()}
            </div>
        );
    }

    componentDidMount() {
        let url = getAccountAssetsUrl()

        axios.get(url, getHeaderRequest())
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

        url = getAccountLoanUrl()
        axios.get(url, getHeaderRequest())
            .then(response => {
                if (response.data) {
                    this.setState({
                        accountLoanObj: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });

        url = getAccountPortfolioUrl()
        axios.get(url, getHeaderRequest())
            .then(response => {
                console.log(response)
                if (response.data) {
                    this.setState({
                        accountPortfolioObj: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }
}