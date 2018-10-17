import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { getHeaderRequest, getTradingStatisticUrl, getMarketHistoricalQuotesUrl, getAccountPortfolioUrl, getDailyWatchlistUrl, postDailyWatchlistUrl, deleteDailyWatchlistUrl } from '../../helpers/requests';
import dataStorage from '../../dataStorage';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as symbolActions from '../../actions/symbol.actions';
import * as checkFilterReady from '../../actions/checkFilterReady.actions'
import { translate, Trans } from 'react-i18next';
import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';

const actionsTemps = { ...symbolActions, ...checkFilterReady }


class CurrentPrice extends React.Component {
    constructor(props) {
        super(props);
        console.log(dataStorage.tradingStatisticObj)
        this.state = {
            allSymbolsArray: [],
            columnDefs: [
                {
                    headerName: "Symbol",
                    field: "Symbol",
                    width: 80
                },
                {
                    headerName: "RSI",
                    field: "RSI_14",
                    width: 80,
                    filter: "agNumberColumnFilter"
                },
                {
                    headerName: "Volume",
                    field: "Volume",
                    width: 80,
                    filter: "agNumberColumnFilter"
                },
                {
                    headerName: "BasicEPS",
                    field: "BasicEPS",
                    width: 80,
                    filter: "agNumberColumnFilter"
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
            symbolSearch: 'FPT',
            checkFilterReady: false
        }

        this.defaultColDef = {
            width: 120,
            editable: false,
            filter: 'agTextColumnFilter'
        }
        this.setTimeOutID = null
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.checkFilterReady && nextProps.checkFilterReady.checkFilterReady && !this.state.checkFilterReady) {
            this.setState({
                checkFilterReady: true
            })
        }
    }

    // shouldComponentUpdate(nextProps) {
    // if (nextProps.checkFilterReady && nextProps.checkFilterReady.checkFilterReady && nextProps.checkFilterReady.checkFilterReady !== this.state.checkFilterReady) {
    //     return true
    // }
    // return false
    // }

    onGridReady(params) {
        this.gridApi = params.api;
        this.filter('RSI_60')
        this.filter('Volume_100000')
        this.filter('EPS_3000')
    }

    onRowClicked(row) {
        if (row.data) {
            const symbol = row.data.Symbol
            this.props.actions.changeSymbol(symbol)
        }
    }

    renderContent() {
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
                        enableSorting={true}
                        onRowClicked={this.onRowClicked.bind(this)}
                        enableFilter={true}
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

    render() {
        return (
            <div className='filterSystem'>
                <input ref={dom => this.inputSearchDom = dom} onChange={(e) => {
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
                <div className='filterOption'>
                    <div onClick={() => this.filter('RSI_60')}>
                        RSI > 60
                    </div>
                    <div onClick={() => this.filter('Volume_100000')}>
                        Volume > 100000
                    </div>
                    <div onClick={() => this.filter('EPS_3000')}>
                        EPS > 3000
                    </div>
                    <div>
                        Current Portfolio
                    </div>
                    {
                        this.state.checkFilterReady
                            ? <div onClick={() => {
                                console.log(dataStorage.tradingStatisticObj)
                                this.setState({
                                    rowData: dataStorage.tradingStatisticObj
                                })
                            }}>Get data</div>
                            : <div>Not ready</div>
                    }

                </div>
                {this.renderContent()}
            </div>
        );
    }

    filter(condition) {
        let result = []
        if (condition === 'RSI_60') {
            var RSIFilterComponent = this.gridApi.getFilterInstance("RSI_14");
            RSIFilterComponent.setModel({
                type: "greaterThan",
                filter: 60,
                filterTo: null
            });
            this.gridApi.onFilterChanged();
        } else if (condition === 'Volume_100000') {
            var VolumeFilterComponent = this.gridApi.getFilterInstance("Volume");
            VolumeFilterComponent.setModel({
                type: "greaterThan",
                filter: 100000,
                filterTo: null
            });
            this.gridApi.onFilterChanged();
        } else if (condition === 'EPS_3000') {
            var BasicEPSFilterComponent = this.gridApi.getFilterInstance("BasicEPS");
            BasicEPSFilterComponent.setModel({
                type: "greaterThan",
                filter: 3000,
                filterTo: null
            });
            this.gridApi.onFilterChanged();
        }
    }

    componentDidMount() {
    }
}

function mapStateToProps(state) {
    return {
        symbol: state.symbol.symbol,
        checkFilterReady: state.checkFilterReady
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionsTemps, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(CurrentPrice));
