import React from 'react';
import axios from 'axios';
import { getEquityAndDividendsUrl } from '../../helpers/requests';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


export default class CapitalAndDividend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cashDividendObj: {},
            stockDividendObj: {},
            stockHolderEquityObj: {},
            totalAssetsObj: {}
        }

        this.chartCashDividendOptions = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'CỔ TỨC BẰNG TIỀN'
            },
            series: [{
                data: this.state.cashDividendObj.data || []
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
                data: this.state.stockDividendObj.data || []
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
                data: this.state.stockHolderEquityObj.data || []
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
                data: this.state.totalAssetsObj.data || []
            }]
        }
    }
    render() {
        if (!this.state.cashDividendObj || !this.state.cashDividendObj.data) return ''
        return (
            <div>
                CapitalAndDividend
                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.chartCashDividendOptions}
                />

                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.chartStockDividendOptions}
                />

                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.chartStockHolderEquityOptions}
                />

                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.chartTotalAssetsOptions}
                />
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
                    this.setState({
                        cashDividendObj: cashDividendObj,
                        stockDividendObj: stockDividendObj,
                        stockHolderEquityObj: stockHolderEquityObj,
                        totalAssetsObj: totalAssetsObj
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }
}