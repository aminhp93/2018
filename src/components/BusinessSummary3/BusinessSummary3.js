import React from 'react';
import SearchSymbol from '../SearchSymbol';
import Transaction from '../Transaction/Transaction';
import CanslimStandard from '../CanslimStandard/CanslimStandard';
import { translate, Trans } from 'react-i18next';
import { getLatestFinancialInfoUrl, getIntradayQuotesUrl, getCompanyHistoricalQuotesUrl, getCompanyNewsUrl, getLastestFinancialReports_3 } from '../../helpers/requests';
import axios from 'axios';
import { Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as symbolActions from '../../actions/symbol.actions';
import { AgGridReact } from 'ag-grid-react';

export default class BusinessSummary3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: props.symbol || '',
            columnDefs: [
                {
                    headerName: "Name",
                    field: "Name",
                    width: 200
                },
                {
                    headerName: "2013",
                    field: "2013",
                    width: 120,
                    cellRenderer: function (params) {
                        return (params.data.Values[0] || {}).Value || ''
                    }
                },
                {
                    headerName: "2014",
                    field: "2014",
                    width: 120,
                    cellRenderer: function (params) {
                        return (params.data.Values[1] || {}).Value || ''
                    }
                },
                {
                    headerName: "2015",
                    field: "2015",
                    width: 120,
                    cellRenderer: function (params) {
                        return (params.data.Values[2] || {}).Value || ''
                    }
                },
                {
                    headerName: "2016",
                    field: "2016",
                    width: 120,
                    cellRenderer: function (params) {
                        return (params.data.Values[3] || {}).Value || ''
                    }
                },
                {
                    headerName: "2017",
                    field: "2017",
                    width: 120,
                    cellRenderer: function (params) {
                        return (params.data.Values[4] || {}).Value || ''
                    }
                }
            ]
        }
        this.defaultColDef = {
            width: 120,
            editable: false,
            filter: 'agTextColumnFilter'
        }
    }

    onGridReady(params) {
        this.gridApi = params.api;
    }

    onRowClicked(row) {
    }

    render() {
        return (
            <div
                className="ag-theme-balham"
                style={{
                    height: '100%'
                }}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    defaultColDef={this.defaultColDef}
                    onGridReady={this.onGridReady.bind(this)}
                    enableSorting={true}
                    onRowClicked={this.onRowClicked.bind(this)}
                    enableFilter={true}
                />
            </div>
        )
    }
    componentDidMount() {
        const url = getLastestFinancialReports_3(this.state.symbol)
        axios.get(url)
            .then(response => {
                console.log(response)
                this.gridApi.setRowData(response.data)
            })
            .catch(error => {

            })
    }
}