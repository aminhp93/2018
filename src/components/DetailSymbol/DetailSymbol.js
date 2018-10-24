import React from 'react';
import SearchSymbol from '../SearchSymbol';
import Transaction from '../Transaction/Transaction';
import CanslimStandard from '../CanslimStandard/CanslimStandard';
import { translate, Trans } from 'react-i18next';
import { getLatestFinancialInfoUrl, getIntradayQuotesUrl, getCompanyHistoricalQuotesUrl, getCompanyNewsUrl } from '../../helpers/requests';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as symbolActions from '../../actions/symbol.actions';

class DetailSymbol extends React.Component {
    constructor(props) {
        console.log('detailsymbol')
        super(props);
        this.state = {
            symbol: props.Symbol
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.symbol) {
            this.setState({
                symbol: nextProps.symbol
            })
        }
    }

    dataReceivedFromSearchSymbol(symbol) {
        this.setState({
            symbol: symbol
        })
        this.props.actions && this.props.actions.changeSymbol(symbol)
        let url = getLatestFinancialInfoUrl(symbol)
        // let latestFinancialInfoObj = {}
        // let intradayQuotesArray = []
        // let historicalQuotesArray = []
        // let companyNewsArray = []

        axios.get(url)
            .then(response => {
                if (response.data) {
                    // latestFinancialInfoObj = response.data
                    console.log(response)

                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    render() {
        return (
            <div>
                <SearchSymbol dataReceivedFromSearchSymbol={this.dataReceivedFromSearchSymbol.bind(this)} />
                {/* <Transaction symbol={this.state.symbol} /> */}
                {/* <CanslimStandard symbol={this.state.symbol} /> */}
                {/* {this.props.symbol} */}
            </div>
        );
    }

    componentDidMount() {
        let url = getLatestFinancialInfoUrl(this.state.symbol)
        // let latestFinancialInfoObj = {}
        // let intradayQuotesArray = []
        // let historicalQuotesArray = []
        // let companyNewsArray = []

        axios.get(url)
            .then(response => {
                if (response.data) {
                    // latestFinancialInfoObj = response.data
                    console.log(response)

                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }
}

function mapStateToProps(state) {
    return {
        symbol: state.symbol.symbol
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(symbolActions, dispatch)
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(DetailSymbol);
export default DetailSymbol
