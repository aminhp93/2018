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
import durationReportEnums from '../../constants/durationReportEnums'

export default class BusinessSummary1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: props.symbol || ''
        }
        this.durationReport = props.durationReport || durationReportEnums.YEAR;

        this.columnDefs_year = [
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

        this.columnDefs_quarter = [
            {
                headerName: "Name",
                field: "Name",
                width: 200
            },
            {
                headerName: "Q2 2017",
                field: "Q2 2017",
                width: 120,
                cellRenderer: function (params) {
                    return (params.data.Values[0] || {}).Value || ''
                }
            },
            {
                headerName: "Q3 2017",
                field: "Q3 2017",
                width: 120,
                cellRenderer: function (params) {
                    return (params.data.Values[1] || {}).Value || ''
                }
            },
            {
                headerName: "Q4 2017",
                field: "Q4 2017",
                width: 120,
                cellRenderer: function (params) {
                    return (params.data.Values[2] || {}).Value || ''
                }
            },
            {
                headerName: "Q1 2018",
                field: "Q1 2018",
                width: 120,
                cellRenderer: function (params) {
                    return (params.data.Values[3] || {}).Value || ''
                }
            },
            {
                headerName: "Q2 2018",
                field: "Q2 2018",
                width: 120,
                cellRenderer: function (params) {
                    return (params.data.Values[4] || {}).Value || ''
                }
            }
        ]
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
                    columnDefs={this.durationReport === durationReportEnums.YEAR ? this.columnDefs_year : this.columnDefs_quarter}
                    defaultColDef={this.defaultColDef}
                    onGridReady={this.onGridReady.bind(this)}
                    enableSorting={true}
                    onRowClicked={this.onRowClicked.bind(this)}
                    enableFilter={true}
                />
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.symbol && nextProps.symbol !== this.state.symbol) || (nextProps.durationReport && nextProps.durationReport !== this.durationReport)) {

            if (nextProps.durationReport && nextProps.durationReport !== this.durationReport) {
                this.durationReport = nextProps.durationReport
            }
            if (nextProps.durationReport && nextProps.durationReport === durationReportEnums.YEAR) {
                this.getDataBusinessSummary1(nextProps.symbol, durationReportEnums.YEAR)
            } else {
                this.getDataBusinessSummary1(nextProps.symbol, durationReportEnums.QUARTER)
            }
        }
    }

    getDataBusinessSummary1(symbol, index) {
        const url = getLastestFinancialReports_1(symbol, index === durationReportEnums.YEAR ? durationReportEnums.YEAR : durationReportEnums.QUARTER)
        axios.get(url)
            .then(response => {
                console.log(response)
                this.gridApi.setRowData(response.data)
                this.gridApi.setColumnDefs(index === durationReportEnums.YEAR ? this.columnDefs_year : this.columnDefs_quarter)
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        if (!this.state.symbol) return;
        this.getDataBusinessSummary1(this.state.symbol, this.durationReport)
    }
}