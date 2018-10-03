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
                    headerName: "Value",
                    field: "Value"
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
            width: 160,
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

    handleOnChangeFilter(e, title) {
        e.persist()
        let volume = 0;
        switch (title) {
            case 'volume':
                volume = e.target.value
                if (volume.length < 4) return
                break;
            case 'price':
                break;
            default:
                break;
        }
        this.setTimeOutID && clearTimeout(this.setTimeOutID);
        this.setTimeOutID = setTimeout(() => {
            let promise = null;
            let listPromise = [];
            for (let i = 0; i < dataStorage.allSymbolsString_HOSE.length; i++) {
                promise = new Promise(resolve => {
                    const url = getMarketHistoricalQuotesUrl(dataStorage.allSymbolsString_HOSE[i]);
                    axios.get(url).then(response => {
                        if (response && response.data) {
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
                    let filterVolume = response.filter(item => item.Volume > Number(volume))
                    this.setState({
                        rowData: filterVolume
                    })
                })
                .catch(error => {
                    console.log(error.response)
                });
        }, 3000)
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
                <input placeholder='volume' onChange={(e) => this.handleOnChangeFilter(e, 'volume')} />
                {this.renderContent()}
            </div>
        );
    }

    componentDidMount() {
        let promise = null;
        let listPromise = [];
        for (let i = 0; i < dataStorage.allSymbolsString.length; i++) {
            promise = new Promise(resolve => {
                const url = getMarketHistoricalQuotesUrl(dataStorage.allSymbolsString_HOSE[i]);
                axios.get(url).then(response => {
                    if (response && response.data) {
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
                let filterVolume = response.filter(item => item.Volume > 100000)
                this.setState({
                    rowData: filterVolume
                })
            })
            .catch(error => {
                console.log(error.response)
            });
    }
}