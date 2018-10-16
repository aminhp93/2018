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
        this.state = {
            columnDefs: [
                {
                    headerName: "Symbol",
                    field: "Symbol",
                    width: 80,
                    cellRenderer: function (params) {
                        if (params.data) {
                            const that = this;
                            const div = document.createElement('div')
                            div.classList = 'symbolCell'
                            const divSymbol = document.createElement('div')
                            divSymbol.innerHTML = params.data.Symbol
                            if (params.data.Open < params.data.Close) {
                                divSymbol.className = 'green'
                            } else if (params.data.Open > params.data.Close) {
                                divSymbol.className = 'red'
                            }
                            const deleteIcon = document.createElement('div')
                            deleteIcon.innerHTML = 'X'
                            deleteIcon.className = 'deleteIcon'
                            deleteIcon.onClick = () => {
                                console.log('click')
                                // this.handleDeleteSymbolFromDailyWatchlist(params.data.Symbol)
                            }
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

    renderDailyWatchlist(symbolsArray) {
        let promise = null;
        let listPromise = [];

        for (let i = 0; i < symbolsArray.length; i++) {
            promise = new Promise(resolve => {
                const url = getMarketHistoricalQuotesUrl(symbolsArray[i]);

                axios.get(url).then(response => {
                    if (response && response.data) {

                        resolve(response.data[response.data.length - 1])
                    }

                }).catch(() => {
                    resolve({});
                })
            })
            listPromise.push(promise);
        }
        Promise.all(listPromise)
            .then(response => {
                this.setState({
                    rowData: response
                })
            })
            .catch(error => {
                console.log(error.response)
            });
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
                        url = getDailyWatchlistUrl()
                        axios.get(url)
                            .then(response => {
                                if (response.data) {
                                    let symbolsArray = response.data.symbols || []
                                    this.renderDailyWatchlist(symbolsArray)
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }

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
                            onRowClicked={this.onRowClicked.bind(this)}
                        />
                    </ div >
                </div>

            )
        } else {
            return <div>No data</div>
        }
    }

    componentDidMount() {
        const url = getDailyWatchlistUrl()
        axios.get(url)
            .then(response => {
                if (response.data) {
                    const symbolsArray = response.data.symbols || []
                    this.renderDailyWatchlist(symbolsArray)
                }
            })
            .catch(error => {
                console.log(error)
            })
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
