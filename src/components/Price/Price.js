import React from 'react';
import axios from 'axios';
import { getHistoricalQuotesUrl } from '../../helpers/requests';
export default class Price extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            historicalQuotesObj: []
        }
    }

    renderHistoricalQuotes() {
        if (this.state.historicalQuotesObj && this.state.historicalQuotesObj.length > 0) {
            return this.state.historicalQuotesObj.map(item => {
                return <div key={item.Date}>
                    {item.Date} {item.PriceAverage}
                </div>
            })
        } else {
            return null
        }

    }

    render() {
        return (
            <div>
                News
                {this.renderHistoricalQuotes()}
            </div>
        );
    }

    componentDidMount() {
        let url = getHistoricalQuotesUrl('FPT')
        axios.get(url)
            .then(response => {
                if (response.data) {
                    this.setState({
                        historicalQuotesObj: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }
}