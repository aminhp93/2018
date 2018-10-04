import React from 'react';
import axios from 'axios';
import { getTradingStatisticUrl, getMarketHistoricalQuotesUrl } from '../../helpers/requests';
import dataStorage from '../../dataStorage';
import { AgGridReact } from 'ag-grid-react';

export default class CurrentPrice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allSymbolsArray: [],
            columnDefs: [
                {
                    headerName: "Symbol",
                    field: "Symbol"
                },
                {
                    headerName: "Close",
                    field: "Close",
                    cellRenderer: function (params) {
                        return params.data.Close || 'close'
                    }
                },
                {
                    headerName: "Open",
                    field: "Open"
                },
                {
                    headerName: "High",
                    field: "High"
                },
                {
                    headerName: "Low",
                    field: "Low"
                },
                {
                    headerName: "Volume",
                    field: "Volume"
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
                    headerName: "Gain",
                    field: "Gain"
                },
                {
                    headerName: "Loss",
                    field: "Loss"
                },
                {
                    headerName: "AverageGain",
                    field: "AverageGain"
                },
                {
                    headerName: "AverageLoss",
                    field: "AverageLoss"
                },
                {
                    headerName: "RSI",
                    field: "RSI"
                },
                {
                    headerName: 'ratioVolume',
                    field: 'ratioVolume',
                    // cellRenderer: function (params) {
                    //     return params.data.ratioVolume.toFixed(1)
                    // }
                },
                {
                    headerName: "Date",
                    field: "Date",
                    sort: 'desc'
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
                this.filterVolume('allSymbolsString_HOSE')
                break;
            case 2:
                this.filterVolume('allSymbolsString_HNX')
                break;
            case 3:
                this.filterVolume('allSymbolsString_UPCOM')
                break;
            default:
                break
        }
    }

    calculateRSI() {
        let promise = null;
        let listPromise = [];

        // for (let i = 0; i < dataStorage.allSymbolsString_HOSE.length; i++) {
        promise = new Promise(resolve => {
            const url = getMarketHistoricalQuotesUrl(dataStorage.allSymbolsString_HOSE[0]);

            axios.get(url).then(response => {
                if (response && response.data) {
                    // let length = 100
                    let data = response.data;
                    let sumGain = 0;
                    let sumLoss = 0
                    // if (response.data.length > 100) {
                    //     data = response.data.slice(data.length - 100)
                    // }
                    for (let i = 1; i < data.length; i++) {
                        let change = data[i].Close - data[i - 1].Close;
                        if (change > 0) {
                            data[i].Gain = change
                            data[i].Loss = 0
                        }
                        if (change < 0) {
                            data[i].Loss = -change
                            data[i].Gain = 0
                        }
                        if (change === 0) {
                            data[i].Loss = 0
                            data[i].Gain = 0
                        }
                        sumGain += data[i].Gain || 0
                        sumLoss += data[i].Loss || 0
                        if (i < 14) {
                            data[i].AverageGain = sumGain / 14
                            data[i].AverageLoss = sumLoss / 14
                        } else {
                            data[i].AverageGain = (data[i - 1].AverageGain * 13 + data[i].Gain) / 14
                            data[i].AverageLoss = (data[i - 1].AverageLoss * 13 + data[i].Loss) / 14
                            data[i].RSI = 100 - 100 / (1 + (data[i].AverageGain) / (data[i].AverageLoss))
                        }

                    }
                    resolve(data)
                } else {
                    resolve([]);
                }
            }).catch(() => {
                resolve([]);
            })
        })
        listPromise.push(promise);
        // }
        Promise.all(listPromise)
            .then(response => {

                this.setState({
                    rowData: response[0]
                })
            })
            .catch(error => {
                console.log(error.response)
            });
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
                <div>
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
                </div>
                {this.renderContent()}
            </div>
        );
    }

    componentDidMount() {
        // this.filterVolume('allSymbolsString_HOSE')
        this.calculateRSI()
    }
}