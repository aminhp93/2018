import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { getHeaderRequest, getTradingStatisticUrl, getMarketHistoricalQuotesUrl, getAccountPortfolioUrl } from '../../helpers/requests';
import dataStorage from '../../dataStorage';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as symbolActions from '../../actions/symbol.actions';
import { translate, Trans } from 'react-i18next';

class CurrentPrice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allSymbolsArray: [],
            columnDefs: [
                {
                    headerName: "Symbol",
                    field: "Symbol",
                    width: 80,
                    cellRenderer: function (params) {
                        const div = document.createElement('div')
                        div.innerHTML = params.data.Symbol
                        if (params.data.Open < params.data.Close) {
                            div.className = 'green'
                        } else if (params.data.Open > params.data.Close) {
                            div.className = 'red'
                        }
                        return div
                    }
                },
                {
                    headerName: "Close",
                    field: "Close",
                    width: 80,
                    cellRenderer: function (params) {
                        return params.data.Close || 'close'
                    }
                },
                {
                    headerName: "Open",
                    field: "Open",
                    width: 80,
                    // cellRenderer: function (params) {
                    //     return params.data.Open && params.data.Open.toFixed(1)
                    // }
                },
                {
                    headerName: "High",
                    field: "High",
                    width: 80
                },
                {
                    headerName: "Low",
                    field: "Low",
                    width: 80
                },
                {
                    headerName: "Volume",
                    field: "Volume",
                    width: 80
                },
                {
                    headerName: "average1monthVolume",
                    field: "average1monthVolume"
                },
                {
                    headerName: "Value",
                    field: "Value"
                },
                {
                    headerName: "CostPrice",
                    field: "CostPrice",
                    width: 80
                },
                {
                    headerName: "HoldingQuantity",
                    field: "HoldingQuantity",
                    width: 80
                },
                {
                    headerName: "GainLoss",
                    field: "GainLoss",
                    width: 80
                },
                {
                    headerName: "GainLossRatio",
                    field: "GainLossRatio",
                    width: 80,
                    cellRenderer: function (params) {
                        const div = document.createElement('div')
                        div.innerHTML = params.data.GainLossRatio && ((params.data.GainLossRatio * 100).toFixed(1) + '%')
                        if (params.data.GainLossRatio) {
                            if (params.data.GainLossRatio > 0) {
                                div.className = 'green'
                            } else if (params.data.GainLossRatio < 0) {
                                div.className = 'red'
                            }
                        }
                        return div
                    }
                },
                // {
                //     headerName: "Gain",
                //     field: "Gain"
                // },
                // {
                //     headerName: "Loss",
                //     field: "Loss"
                // },
                // {
                //     headerName: "AverageGain",
                //     field: "AverageGain"
                // },
                // {
                //     headerName: "AverageLoss",
                //     field: "AverageLoss"
                // },
                {
                    headerName: "RSI",
                    field: "RSI",
                    width: 80,
                    cellRenderer: function (params) {
                        return params.data.RSI && params.data.RSI.toFixed(1)
                    }
                },
                {
                    headerName: 'ratioVolume',
                    field: 'ratioVolume',
                    width: 80,
                    cellRenderer: function (params) {
                        return params.data.ratioVolume && params.data.ratioVolume.toFixed(1)
                    }
                },
                {
                    headerName: "Date",
                    field: "Date",
                    sort: 'desc',
                    width: 80,
                    cellRenderer: function (params) {
                        return params.data.Date && moment(params.data.Date).format('MM-DD')
                    }
                }
            ],
            rowData: [],
            symbolSearch: 'FPT'
        }

        this.defaultColDef = {
            width: 120,
            editable: true,
            filter: 'agTextColumnFilter'
        }
        this.setTimeOutID = null
        this.handleOnChangeFilter = this.handleOnChangeFilter.bind(this);
    }

    onGridReady(params) {
        this.gridApi = params;
    }

    onRowClicked(row) {
        if (row.data) {
            const symbol = row.data.Symbol
            this.props.actions.changeSymbol(symbol)
        }
    }

    renderContent() {
        // const result = []
        // for (let i = 0; i < this.state.allSymbolsArray.length; i++) {
        //     const item = this.state.allSymbolsArray[i];
        //     if (item) {
        //         result.push(
        //             <div>{item.Symbol}</div>
        //         )
        //     }
        // }
        if (this.state.rowData.length > 0) {
            return (
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
            )
        } else {
            return <div>No data</div>
        }

    }

    filterVolume(market) {
        let volume = 100000;
        let ratioVolume = 2;
        let averageNumberDay = 20;
        let promise = null;
        let listPromise = [];

        for (let i = 0; i < dataStorage[market].length; i++) {
            promise = new Promise(resolve => {
                const url = getMarketHistoricalQuotesUrl(dataStorage[market][i]);

                axios.get(url).then(response => {
                    if (response && response.data) {
                        let average1monthVolume = 0;
                        let sum1monthVolume = 0
                        for (let j = 1; j < (averageNumberDay + 1); j++) {
                            sum1monthVolume += response.data[response.data.length - 1 - j].Volume
                        }
                        average1monthVolume = sum1monthVolume / averageNumberDay
                        response.data[response.data.length - 1].average1monthVolume = average1monthVolume
                        response.data[response.data.length - 1].ratioVolume = response.data[response.data.length - 1].Volume / average1monthVolume
                        resolve(response.data[response.data.length - 1])
                    } else {
                        resolve([]);
                    }
                }).catch(() => {
                    resolve([]);
                })
            })
            listPromise.push(promise);
        }
        Promise.all(listPromise)
            .then(response => {
                let filterVolume = response.filter(item => {
                    return (item.Volume > volume && item.Volume > ratioVolume * item.average1monthVolume && item.Volume)
                }).sort(((a, b) => b.ratioVolume - a.ratioVolume))
                this.setState({
                    rowData: filterVolume
                })
            })
            .catch(error => {
                console.log(error.response)
            });
    }


    handleOnChangeFilter(e, title) {
        // e.persist()
        // this.filterVolume()
        // switch (title) {
        //     case 'volume':
        //         volume = e.target.value
        //         if (volume.length < 4) return
        //         break;
        //     case 'ratioVolume':
        //         // ratioVolume = e.target.value
        //         break;
        //     case 'averageNumberDay':
        //         // averageNumberDay = e.target.value
        //         break;
        //     default:
        //         break;
        // }
        // this.setTimeOutID && clearTimeout(this.setTimeOutID);
        // this.setTimeOutID = setTimeout(() => {

        // }, 3000)
    }

    handleOnChangeMarket(index) {
        switch (index) {
            case 1:
                this.filterVolume('allSymbolsArray_HOSE')
                break;
            case 2:
                this.filterVolume('allSymbolsArray_HNX')
                break;
            case 3:
                this.filterVolume('allSymbolsArray_UPCOM')
                break;
            default:
                break
        }
    }

    calculateRSI(stringSymbols = dataStorage.allSymbolsArray_HOSE) {
        let promise = null;
        let listPromise = [];

        for (let i = 0; i < stringSymbols.length; i++) {
            promise = new Promise(resolve => {
                const url = getMarketHistoricalQuotesUrl(stringSymbols[i]);

                axios.get(url).then(response => {
                    if (response && response.data) {
                        let data = response.data;
                        let sumGain = 0;
                        let sumLoss = 0
                        for (let j = 1; j < data.length; j++) {
                            let change = data[j].Close - data[j - 1].Close;
                            if (change > 0) {
                                data[j].Gain = change
                                data[j].Loss = 0
                            }
                            if (change < 0) {
                                data[j].Loss = -change
                                data[j].Gain = 0
                            }
                            if (change === 0) {
                                data[j].Loss = 0
                                data[j].Gain = 0
                            }
                            sumGain += data[j].Gain || 0
                            sumLoss += data[j].Loss || 0
                            if (j < 14) {
                                data[j].AverageGain = sumGain / 14
                                data[j].AverageLoss = sumLoss / 14
                            } else {
                                data[j].AverageGain = (data[j - 1].AverageGain * 13 + data[j].Gain) / 14
                                data[j].AverageLoss = (data[j - 1].AverageLoss * 13 + data[j].Loss) / 14
                                data[j].RSI = 100 - 100 / (1 + (data[j].AverageGain) / (data[j].AverageLoss))
                            }
                        }
                        if (stringSymbols === dataStorage.allSymbolsArray_HOSE) {
                            if ((data[data.length - 1].RSI >= 60) && (data[data.length - 2].RSI < data[data.length - 1].RSI)) {
                                resolve(data[data.length - 1])
                            } else {
                                resolve({})
                            }
                        } else {
                            data[data.length - 1].HoldingQuantity = dataStorage.currentSymbolsObj[data[data.length - 1].Symbol].quantity
                            data[data.length - 1].CostPrice = dataStorage.currentSymbolsObj[data[data.length - 1].Symbol].costPrice
                            data[data.length - 1].GainLoss = (data[data.length - 1].Close - data[data.length - 1].CostPrice) * data[data.length - 1].HoldingQuantity
                            data[data.length - 1].GainLossRatio = (data[data.length - 1].Close - data[data.length - 1].CostPrice) / data[data.length - 1].CostPrice
                            resolve(data[data.length - 1])
                        }
                    } else {
                        resolve({});
                    }
                }).catch(() => {
                    resolve({});
                })
            })
            listPromise.push(promise);
        }
        Promise.all(listPromise)
            .then(response => {
                let filteredResponse = []
                if (stringSymbols === dataStorage.allSymbolsArray_HOSE) {
                    filteredResponse = response.filter(item => item.Symbol && item.Volume > 10000).sort((a, b) => b.RSI - a.RSI)
                } else {
                    filteredResponse = response
                }
                this.setState({
                    rowData: filteredResponse
                })
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    handleGetCurrentPortfolio() {
        let url = getAccountPortfolioUrl()
        axios.get(url, getHeaderRequest())
            .then(response => {
                if (response.data && response.data.stocks) {
                    const stocks = response.data.stocks;
                    let symbolsArray = [];
                    for (let i = 0; i < stocks.length; i++) {
                        symbolsArray.push(stocks[i].symbol)
                        dataStorage.currentSymbolsObj[stocks[i].symbol] = stocks[i]
                    }
                    this.calculateRSI(symbolsArray)
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    handleFilterRSI() {

    }

    handleFilterVolume() {
        this.filterVolume('allSymbolsArray_HOSE')
    }

    render() {
        return (
            <div className='filterSystem'>
                <input onChange={(e) => {
                    if (e.target.value && e.target.value.length > 2) {
                        const url = getMarketHistoricalQuotesUrl(e.target.value);
                        axios.get(url)
                            .then(response => {
                                if (response.data) {
                                    this.setState({
                                        rowData: [response.data[response.data.length - 1]]
                                    })
                                }
                            })
                            .catch(error => {
                                console.log(error.response)
                            });
                    }
                }} />
                {/* <input placeholder='volume' onChange={(e) => this.handleOnChangeFilter(e, 'volume')} /> */}
                {/* <div>
                    volume = 100000;
                    ratioVolume = 2;
                    averageNumberDay = 20;
                </div>
                <div onClick={() => this.handleOnChangeMarket(1)}>
                    HOSE
                </div>
                <div onClick={() => this.handleOnChangeMarket(2)}>
                    HNX
                </div>
                <div onClick={() => this.handleOnChangeMarket(3)}>
                    UPCOM
                </div> */}
                <div className='filterOption'>
                    <div onClick={this.handleFilterRSI.bind(this)}>
                        Filter with RSI > 60
                    </div>
                    <div onClick={this.handleGetCurrentPortfolio.bind(this)}>
                        Current Portfolio
                    </div>
                    <div onClick={this.handleFilterVolume.bind(this)}>
                        Filter Volume >
                    </div>
                </div>
                {this.renderContent()}
            </div>
        );
    }

    componentDidMount() {
        // this.filterVolume('allSymbolsArray_HOSE')
        this.calculateRSI()
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

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(CurrentPrice));
