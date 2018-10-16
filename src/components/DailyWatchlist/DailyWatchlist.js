import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as symbolActions from '../../actions/symbol.actions';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { translate, Trans } from 'react-i18next';
import config from '../../config';
import axios from 'axios';
import { getHeaderRequest, getTradingStatisticUrl, getMarketHistoricalQuotesUrl, getAccountPortfolioUrl, getDailyWatchlistUrl, postDailyWatchlistUrl, deleteDailyWatchlistUrl } from '../../helpers/requests';


class DailyWatchlist extends React.Component {
    constructor(props) {
        super(props);
        const that = this
        this.state = {
            columnDefs: [
                {
                    headerName: "Symbol",
                    field: "Symbol",
                    width: 80,
                    cellRenderer: function (params) {

                        if (params.data) {
                            const div = document.createElement('div')
                            div.classList = 'symbolCell'
                            const divSymbol = document.createElement('div')
                            divSymbol.innerHTML = params.data.Symbol

                            const deleteIcon = document.createElement('div')
                            deleteIcon.innerHTML = 'X'
                            deleteIcon.className = 'deleteIcon'
                            deleteIcon.addEventListener("click", function () {
                                that.handleDeleteSymbolFromDailyWatchlist(params.data.Symbol)
                            });
                            div.appendChild(divSymbol)
                            div.appendChild(deleteIcon)
                            return div
                        }

                    }
                }
            ],
            rowData: []
        }
    }


    onRowClicked(row) {
        if (row.data && row.data.length) {
            const symbol = row.data[0]
            this.props.actions.changeSymbol(symbol)
        }
    }

    onGridReady(params) {
        this.gridApi = params;
    }

    handleGetSymbolFromDailyWatchlist() {
        let url = getDailyWatchlistUrl()
        axios.get(url)
            .then(response => {
                if (response.data) {
                    let symbolsArray = response.data.symbols || []
                    let result = []
                    for (let i = 0; i < symbolsArray.length; i++) {
                        result.push({ 'Symbol': symbolsArray[i] })
                    }
                    this.setState({
                        rowData: result
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleAddSymbolToDailyWatchlist(e) {
        if (e.key === 'Enter') {
            let url = postDailyWatchlistUrl();
            let data = {
                symbol: this.input.value
            }
            axios.post(url, data)
                .then(response => {
                    if (response.data) {
                        console.log(response.data)
                        this.handleGetSymbolFromDailyWatchlist()
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }

    }

    handleDeleteSymbolFromDailyWatchlist(symbol) {
        const url = deleteDailyWatchlistUrl(symbol)
        axios.delete(url)
            .then(response => {
                if (response.data) {
                    this.handleGetSymbolFromDailyWatchlist()
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        if (this.state.rowData.length > 0) {
            return (
                <div>
                    <input ref={dom => this.input = dom} onKeyPress={this.handleAddSymbolToDailyWatchlist.bind(this)} />>
                    <div
                        className="ag-theme-balham"
                        style={{
                            height: '100%'
                        }}
                    >
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            defaultColDef={this.defaultColDef}
                            onGridReady={this.onGridReady.bind(this)}
                            enableSorting
                        // onRowClicked={this.onRowClicked.bind(this)}
                        />
                    </ div >
                </div>

            )
        } else {
            return <div>No data</div>
        }
    }

    componentDidMount() {
        this.handleGetSymbolFromDailyWatchlist()
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

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(DailyWatchlist));
