import React from 'react';
import axios from 'axios';
import { getYearlyFinancialInfoUrl, getQuarterlyFinancialInfoUrl } from '../../helpers/requests';
export default class Financials extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yearlyFinancialInfoObj: [],
            quarterlyFinancialInfoObj: []
        }
    }

    renderRevenue() {
        return null
    }

    renderProfit() {
        return null
    }

    renderFinancialCost() {
        return null
    }

    render() {
        return (
            <div>
                Financials
                {this.renderRevenue()}
                {this.renderProfit()}
                {this.renderFinancialCost()}

            </div>
        );
    }

    componentDidMount() {
        let url = getYearlyFinancialInfoUrl('FPT')
        axios.get(url)
            .then(response => {
                if (response.data) {
                    this.setState({
                        yearlyFinancialInfoObj: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
        url = getQuarterlyFinancialInfoUrl('FPT')
        axios.get(url)
            .then(response => {
                if (response.data) {
                    this.setState({
                        quarterlyFinancialInfoObj: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }
}