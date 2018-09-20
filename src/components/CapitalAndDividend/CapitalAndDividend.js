import React from 'react';
import axios from 'axios';
import { getEquityAndDividendsUrl } from '../../helpers/requests';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


export default class CapitalAndDividend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartCashDividendOptions: {},
            chartStockDividendOptions: {},
            chartStockHolderEquityOptions: {},
            chartTotalAssetsOptions: {}
        }
    }

    render() {
        return (
            <div>
                CapitalAndDividend
                {
                    this.state.chartCashDividendOptions.series ? <HighchartsReact
                        highcharts={Highcharts}
                        options={this.state.chartCashDividendOptions}
                    /> : null
                }
                {
                    this.state.chartStockDividendOptions.series ? <HighchartsReact
                        highcharts={Highcharts}
                        options={this.state.chartStockDividendOptions}
                    /> : null
                }
                {
                    this.state.chartStockHolderEquityOptions.series ? <HighchartsReact
                        highcharts={Highcharts}
                        options={this.state.chartStockHolderEquityOptions}
                    /> : null
                }
                {
                    this.state.chartTotalAssetsOptions.series ? <HighchartsReact
                        highcharts={Highcharts}
                        options={this.state.chartTotalAssetsOptions}
                    /> : null
                }
            </div>
        );
    }
    componentDidMount() {
        const url = getEquityAndDividendsUrl('FPT')
        let cashDividendObj = {};
        let stockDividendObj = {};
        let stockHolderEquityObj = {};
        let totalAssetsObj = {};

        axios.get(url)
            .then(response => {
                if (response.data) {
                    for (let i = 0; i < response.data.length; i++) {
                        cashDividendObj.year = response.data[i].Year
                        if (!cashDividendObj.data) {
                            cashDividendObj.data = []
                        } else {
                            cashDividendObj.data.push(response.data[i].CashDividend)
                        }

                        stockDividendObj.year = response.data[i].Year
                        if (!stockDividendObj.data) {
                            stockDividendObj.data = []
                        } else {
                            stockDividendObj.data.push(response.data[i].StockDividend)
                        }

                        stockHolderEquityObj.year = response.data[i].Year
                        if (!stockHolderEquityObj.data) {
                            stockHolderEquityObj.data = []
                        } else {
                            stockHolderEquityObj.data.push(response.data[i].StockHolderEquity)
                        }

                        totalAssetsObj.year = response.data[i].Year
                        if (!totalAssetsObj.data) {
                            totalAssetsObj.data = []
                        } else {
                            totalAssetsObj.data.push(response.data[i].TotalAssets)
                        }
                    }
                    this.chartCashDividendOptions = {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'CỔ TỨC BẰNG TIỀN'
                        },
                        series: [{
                            data: cashDividendObj.data || []
                        }]
                    }

                    this.chartStockDividendOptions = {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'CỔ TỨC BẰNG CỔ PHIẾU'
                        },
                        series: [{
                            data: stockDividendObj.data || []
                        }]
                    }

                    this.chartStockHolderEquityOptions = {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'VỐN CHỦ SỞ HỮU (TỶ)'
                        },
                        series: [{
                            data: stockHolderEquityObj.data || []
                        }]
                    }

                    this.chartTotalAssetsOptions = {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'TÀI SẢN (TỶ)'
                        },
                        series: [{
                            data: totalAssetsObj.data || []
                        }]
                    }

                    this.setState({
                        chartCashDividendOptions: this.chartCashDividendOptions,
                        chartStockDividendOptions: this.chartStockDividendOptions,
                        chartStockHolderEquityOptions: this.chartStockHolderEquityOptions,
                        chartTotalAssetsOptions: this.chartTotalAssetsOptions
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }
}