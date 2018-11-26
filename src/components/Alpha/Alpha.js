import React from 'react';
import dataStorage from '../../dataStorage';
import axios from 'axios';
import { getMarketHistoricalQuotesUrl } from '../../helpers/requests'
export default class Alpha extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rev_2016: 0,
            rev_2017: 0
        }
    }


    render() {
        return (
            <div>
                <div>
                    Alpha1: Backtest alpha1:
                </div>


                <div>
                    Required:
                    Revenue Increase over years from 2016-2017 <span className={this.state.rev_2016 < this.state.rev_2017 ? 'green' : 'red'}>{this.state.rev_2016} {this.state.rev_2017}</span>
                </div>
                <div>
                    Target:
                </div>
                <div>
                    Percent:
                </div>



            </div>
        );
    }

    componentDidMount() {
        let url = 'https://svr2.fireant.vn/api/Data/Finance/YearlyFinancialInfo?symbol=SBT&fromYear=2015&toYear=2018'
        axios.get(url)
            .then(response => {
                let rev_2017 = response.data[0].Sales
                let rev_2016 = response.data[1].Sales
                this.setState({
                    rev_2016,
                    rev_2017
                })
            })
            .catch(error => {
                console.log(error)
            })
        url = getMarketHistoricalQuotesUrl('SBT')
        axios.get(url)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
}