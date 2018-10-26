import React from 'react';
import SearchSymbol from '../SearchSymbol';
import Transaction from '../Transaction/Transaction';
import CanslimStandard from '../CanslimStandard/CanslimStandard';
import { translate, Trans } from 'react-i18next';
import { getLatestFinancialInfoUrl, getIntradayQuotesUrl, getCompanyHistoricalQuotesUrl, getCompanyNewsUrl, getLastestFinancialReports_1 } from '../../helpers/requests';
import axios from 'axios';
import { Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as symbolActions from '../../actions/symbol.actions';
import { AgGridReact } from 'ag-grid-react';

export default class BusinessSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: props.symbol || ''
        }
    }

    render() {
        return (
            <div>
                BusinessSummary {this.state.symbol}
            </div>
        );
    }
    componentDidMount() {
        const url = getLastestFinancialReports_1(this.state.symbol)
        axios.get(url)
            .then(response => {
                console.log(response)
            })
            .catch(error => {

            })
    }
}