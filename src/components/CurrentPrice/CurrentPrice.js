import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { getHeaderRequest, getTradingStatisticUrl, getMarketHistoricalQuotesUrl, getAccountPortfolioUrl, getDailyWatchlistUrl, postDailyWatchlistUrl, deleteDailyWatchlistUrl, getYearlyFinancialInfoUrl } from '../../helpers/requests';
import dataStorage from '../../dataStorage';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as symbolActions from '../../actions/symbol.actions';
import * as checkFilterReady from '../../actions/checkFilterReady.actions'
import { translate, Trans } from 'react-i18next';
import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';
import ReactDOM from 'react-dom';
import showModal from './../Modal';
import DetailSymbol from '../DetailSymbol';
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
                    width: 80,
                    cellRenderer: function (params) {
                        const div = document.createElement('div')
                        const span = document.createElement('span')
                        div.appendChild(span)
                        if (params.data.Close > params.data.Open) {
                            span.className = 'green'
                        } else if (params.data.Close < params.data.Open) {
                            span.className = 'red'
                        }

                        span.innerHTML = params.data.Symbol
                        span.addEventListener('click', function () {
                            showModal({
                                component: DetailSymbol,
                                props: {
                                    symbol: params.data.Symbol
                                }
                            });
                        })
                        return div
                    }
                },
                {
                    headerName: "Close",
                    field: "Close",
                    width: 80
                },
                {
                    headerName: "RSI",
                    field: "RSI_14",
                    width: 60,
                    filter: "agNumberColumnFilter"
                },
                {
                    headerName: "Volume",
                    field: "Volume",
                    width: 80,
                    filter: "agNumberColumnFilter"
                },
                {
                    headerName: "EPS",
                    field: "EPS",
                    width: 80,
                    filter: "agNumberColumnFilter"
                },
                // {
                //     headerName: "Date",
                //     field: "Date",
                //     sort: 'desc',
                //     width: 80,
                //     cellRenderer: function (params) {
                //         return params.data.Date && moment(params.data.Date).format('MM-DD')
                //     }
                // },
                {
                    headerName: "MarketCapitalization",
                    field: "MarketCapitalization",
                    width: 80,
                    filter: "agNumberColumnFilter"
                },
                {
                    headerName: "ROE",
                    field: "ROE",
                    width: 80,
                    filter: "agNumberColumnFilter"
                },
                {
                    headerName: "PerformancePrice1Month",
                    field: "PerformancePrice1Month",
                    width: 80,
                    filter: "agNumberColumnFilter"
                },
            ],
            rowData: [{ "MarketCapitalization": "", "Symbol": "AAA", "Exchange": "HOSTC", "AvgPrice5d": 15270, "AvgVolume5d": 1927670, "AvgPrice10d": 15955, "AvgVolume10d": 1926266, "AvgPrice20d": 16672.5, "AvgVolume20d": 1855874.5, "HighPrice1w": 15750, "LowPrice1w": 15350, "HighPrice1m": 18050, "LowPrice1m": 14500, "HighPrice3m": 18300, "LowPrice3m": 14500, "HighPrice6m": 23000, "LowPrice6m": 14500, "HighPrice1y": 26334.665997494863, "LowPrice1y": 14500, "HighPrice2y": 26850.309807236023, "LowPrice2y": 14500, "HighPrice3y": 26850.309807236023, "LowPrice3y": 6458.9707622707365, "HighPrice5y": 26850.309807236023, "LowPrice5y": 5623.128531542493, "PriceChange1w": -0.022082018927444796, "PriceChange1m": -0.0718562874251497, "PriceChange3m": -0.13165266106442577, "PriceChange6m": -0.2906178489702517, "PriceChange1y": -0.4030735701176635, "PriceChange2y": -0.2548016493100085, "PriceChange3y": 1.3527089672147963, "PriceChange5y": 1.5681422197295094, "Date": "2018-10-16T17:00:00Z", "BuyCount1w": 825, "SellCount1w": 623, "BuyQuantity1w": 2112240, "SellQuantity1w": 3007980, "BuyCount1m": 25212, "SellCount1m": 17939, "BuyQuantity1m": 63443960, "SellQuantity1m": 76717890, "BuyCount3m": 62771, "SellCount3m": 48148, "BuyQuantity3m": 170296690, "SellQuantity3m": 192624230, "BuyCount6m": 105358, "SellCount6m": 87621, "BuyQuantity6m": 299941880, "SellQuantity6m": 325249670, "BuyCount1y": 222453, "SellCount1y": 187848, "BuyQuantity1y": 573003310, "SellQuantity1y": 622304590, "BuyCount2y": 415345, "SellCount2y": 345824, "BuyQuantity2y": 1042073010, "SellQuantity2y": 1121701140, "BuyCount3y": 458052, "SellCount3y": 387917, "BuyQuantity3y": 1183011810, "SellQuantity3y": 1264683240, "BuyCount5y": 538591, "SellCount5y": 470614, "BuyQuantity5y": 1484562510, "SellQuantity5y": 1586995240, "AvgTradingSpeed10d": 6635.523981900453, "AvgTradingSpeed3m": 7553.98431372549, "SharesOutStanding": 171199976, "AvgPrice4d": 15400, "AvgPrice9d": 15822.222222222223, "AvgPrice14d": 16310.714285714286, "AvgPrice15d": 16410, "AvgPrice19d": 16636.842105263157, "AvgPrice44d": 16882.954545454544, "AvgPrice45d": 16878.88888888889, "AvgVolume4d": 1617940, "AvgVolume9d": 1985098.888888889, "AvgVolume14d": 1818355, "AvgVolume15d": 1857056, "AvgVolume19d": 1876103.6842105263, "AvgVolume44d": 1722217.5, "AvgVolume45d": 1706183.7777777778, "AvgVolume3m": 1692058.6153846155, "StdEV19d": 937.2190253004023, "StdEV20d": 926.6168301946603, "EMA5d": 15529.537236021974, "EMA10d": 15868.014949636623, "EMA15d": 16138.659196136818, "EMA20d": 16325.528667686105, "EMA45d": 16830.39607993764, "DEMA5d": 15298.118798404368, "DEMA10d": 15290.842062974016, "DEMA15d": 15513.506898028543, "DEMA20d": 15731.91329990822, "DEMA45d": 16102.149771301203, "TEMA5d": 15408.742764344264, "TEMA10d": 15134.207537769875, "TEMA15d": 15181.053310398918, "TEMA20d": 15366.528459329207, "TEMA45d": 16074.035535497782, "AvgGain14d": 104.61176543856367, "AvgLoss14d": 182.00359008600648, "LastPriceClose": 15500, "LastPriceHigh": 15750, "LastPriceLow": 15350, "LastDealVolume": 1609410, "AvgTypPrice13d": 16280.76923076923, "PositiveMF13d": 118956730166.66667, "NegativeMF13d": 252050260833.33337, "EMA12d": 15988.21264057035, "EMA26d": 16483.93087864978, "RS": 8, "Beta": 0.7768582343595447, "Price1w": 15500, "Price1m": 17000, "Price3m": 18200, "Price6m": 21300, "Price1y": 25708.527085666316, "EPS": 2208.4365635194395, "Volume": 839870, "Open": 15350, "Close": 15200, "High": 15500, "Low": 15150, "RSI_14": 34, "Average1monthVolume": 1855874.5, "RatioVolume": 0.4525467643420932 }],
            symbolSearch: 'FPT',
            checkFilterReady: false,
            numberStockIncrease: 0,
            numberStockDecrease: 0,
            numberStockUnchange: 0
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

    onGridReady(params) {
        this.gridApi = params.api;
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
                </div>
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
                <div>
                    <div>
                        <span className='green'>{this.state.numberStockIncrease}</span> - <span className='red'>{this.state.numberStockDecrease}</span> - <span>{this.state.numberStockUnchange}</span>
                    </div>
                </div>
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
                    <div onClick={() => this.filter('Canslim')}>
                        Canslim
                    </div>

                    {
                        this.state.checkFilterReady
                            ? <div onClick={() => {
                                console.log(dataStorage.tradingStatisticObj)
                                this.setState({
                                    numberStockIncrease: dataStorage.numberStockIncrease,
                                    numberStockDecrease: dataStorage.numberStockDecrease,
                                    numberStockUnchange: dataStorage.numberStockUnchange
                                })
                                this.gridApi.setRowData(dataStorage.tradingStatisticObj)

                                this.gridApi.sizeColumnsToFit()
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
            let filter_data = dataStorage.tradingStatisticObj.filter(item => item.RSI_14 > 60 && item.RSI_14 < 70 && item.RSI_14 > item.RSI_14_previous && item.valid_volume)
            this.gridApi.setRowData(filter_data)
            this.gridApi.sizeColumnsToFit()
            // var RSIFilterComponent = this.gridApi.getFilterInstance("RSI_14");
            // RSIFilterComponent.setModel({
            //     type: "greaterThan",
            //     filter: 60,
            //     filterTo: null
            // });
            // this.gridApi.onFilterChanged();
        } else if (condition === 'Volume_100000') {
            var VolumeFilterComponent = this.gridApi.getFilterInstance("Volume");
            VolumeFilterComponent.setModel({
                type: "greaterThan",
                filter: 100000,
                filterTo: null
            });
            this.gridApi.onFilterChanged();
        } else if (condition === 'EPS_3000') {
            var EPSFilterComponent = this.gridApi.getFilterInstance("EPS");
            EPSFilterComponent.setModel({
                type: "greaterThan",
                filter: 3000,
                filterTo: null
            });
            this.gridApi.onFilterChanged();
        } else if (condition === 'Canslim') {
            // Vốn hóa ≥ 300 tỷ đồng
            var MarketCapitalizationFilterComponent = this.gridApi.getFilterInstance("MarketCapitalization");
            MarketCapitalizationFilterComponent.setModel({
                type: "greaterThan",
                filter: 300000000000,
                filterTo: null
            });
            this.gridApi.onFilterChanged();
            // Giá trị GD trung bình 20 phiên gần nhất ≥ 20 tỷ đồng


            // Tốc độ tăng trưởng LN ≥ 20%/năm


            // EPS 4 quý gần nhất ≥ 2000 đồng
            var EPSFilterComponent = this.gridApi.getFilterInstance("EPS");
            EPSFilterComponent.setModel({
                type: "greaterThan",
                filter: 2000,
                filterTo: null
            });
            this.gridApi.onFilterChanged();
            // ROE 4 quý gần nhất ≥ 15%
            var ROEFilterComponent = this.gridApi.getFilterInstance("ROE");
            ROEFilterComponent.setModel({
                type: "greaterThan",
                filter: 0.17,
                filterTo: null
            });
            this.gridApi.onFilterChanged();
            // Thời gian niêm yết ≥ 6 tháng

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
