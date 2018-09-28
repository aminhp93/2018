import React from 'react';
import SearchSymbol from '../SearchSymbol';
import Transaction from '../Transaction/Transaction';
import ChartSymbol from '../ChartSymbol/ChartSymbol';
import CanslimStandard from '../CanslimStandard/CanslimStandard';

export default class DetailSymbol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    dataReceivedFromSearchSymbol(symbol) {
        this.setState({
            symbol: symbol
        })
    }

    render() {
        return (
            <div>
                <SearchSymbol dataReceivedFromSearchSymbol={this.dataReceivedFromSearchSymbol.bind(this)} />
                {/* <Transaction symbol={this.state.symbol} /> */}
                <CanslimStandard symbol={this.state.symbol} />
                <ChartSymbol />
            </div>
        );
    }
}