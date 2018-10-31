import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import { getTradingViewScanUrl } from '../../helpers/requests'
import axios from 'axios'

export default class TradingViewFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.columnDefs = [
            {
                headerName: "Ticker",
                field: "Ticker",
                cellRenderer: function (params) {
                    return params.data.d[0]
                }
            },
            {
                headerName: "Close",
                field: "Close",
                cellRenderer: function (params) {
                    return params.data.d[1]
                }
            },
            {
                headerName: "CHG%",
                field: "CHG%",
                cellRenderer: function (params) {
                    return params.data.d[2]
                }
            },
            {
                headerName: "CHG",
                field: "CHG",
                cellRenderer: function (params) {
                    return params.data.d[3]
                }
            },
            {
                headerName: "Rating",
                field: "Rating",
                cellRenderer: function (params) {
                    return params.data.d[4] || 0
                }
            },
            {
                headerName: "Vol",
                field: "Vol",
                cellRenderer: function (params) {
                    return params.data.d[5]
                }
            },
            {
                headerName: "MKT CAP",
                field: "MKT CAP",
                cellRenderer: function (params) {
                    return params.data.d[6]
                }
            },
            {
                headerName: "P/E",
                field: "P/E",
                cellRenderer: function (params) {
                    return params.data.d[7]
                }
            },
            {
                headerName: "EPS(TTM)",
                field: "EPS(TTM)",
                cellRenderer: function (params) {
                    return params.data.d[8]
                }
            },
            {
                headerName: "Employees",
                field: "Employees",
                cellRenderer: function (params) {
                    return params.data.d[9]
                }
            },
            {
                headerName: "Sector",
                field: "Sector",
                cellRenderer: function (params) {
                    return params.data.d[10]
                }
            }
        ]

        this.defaultColDef = {
            width: 80,
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
        return <div>
            <div
                className="ag-theme-balham"
                style={{
                    height: '100%'
                }}
            >
                <AgGridReact
                    columnDefs={this.columnDefs}
                    defaultColDef={this.defaultColDef}
                    onGridReady={this.onGridReady.bind(this)}
                    enableSorting={true}
                    onRowClicked={this.onRowClicked.bind(this)}
                    enableFilter={true}
                // autoGroupColumnDef={this.autoGroupColumnDef}
                />
            </div>
        </div>
    }

    componentDidMount() {
        const url = getTradingViewScanUrl()
        let obj = {
            "filter": [
                {
                    "left": "market_cap_basic",
                    "operation": "nempty"
                },
                {
                    "left": "type",
                    "operation": "in_range",
                    "right": ["stock", "dr", "fund"]
                },
                {
                    "left": "subtype",
                    "operation": "in_range",
                    "right": ["common", "", "etf", "unit"]
                }
            ],
            "symbols": { "query": { "types": [] }, "tickers": [] },
            "columns": ["name", "close|1M", "change|1M", "change_abs|1M", "Recommend.All|1M", "volume|1M", "market_cap_basic", "price_earnings_ttm", "earnings_per_share_basic_ttm", "number_of_employees", "sector", "description", "name", "type", "subtype", "pricescale", "minmov", "fractional", "minmove2"],
            "sort": { "sortBy": "market_cap_basic", "sortOrder": "desc" },
            "options": { "lang": "vi" },
            "range": [0, 150]
        }
        const allFields = { "filter": [{ "left": "market_cap_basic", "operation": "nempty" }, { "left": "type", "operation": "in_range", "right": ["stock", "dr", "fund"] }, { "left": "subtype", "operation": "in_range", "right": ["common", "", "etf", "unit"] }], "symbols": { "query": { "types": [] }, "tickers": [] }, "columns": ["name", "close|1M", "change|1M", "change_abs|1M", "Recommend.All|1M", "volume|1M", "market_cap_basic", "price_earnings_ttm", "earnings_per_share_basic_ttm", "number_of_employees", "sector", "gap|1M", "pre_change|1M", "change_from_open|1M", "Aroon.Down|1M", "Aroon.Up|1M", "beta_1_year", "DonchCh20.Lower|1M", "KltChnl.upper|1M", "gross_margin", "operating_margin", "after_tax_margin", "pre_tax_margin", "DonchCh20.Upper|1M", "KltChnl.lower|1M", "Volatility.D", "Volatility.M", "Volatility.W", "AO|1M", "ADX+DI|1M", "ADX|1M", "ADX-DI|1M", "P.SAR|1M", "Mom|1M", "CCI20|1M", "RSI|1M", "RSI7|1M", "industry", "expected_annual_dividends", "float_shares_outstanding", "dps_common_stock_prim_issue_fy", "dividends_paid", "UO|1M", "last_annual_revenue", "ChaikinMoneyFlow|1M", "MoneyFlow|1M", "BB.lower|1M", "BB.upper|1M", "ebitda", "basic_eps_net_income", "earnings_per_share_forecast_next_fq", "last_annual_eps", "earnings_per_share_fq", "earnings_per_share_diluted_ttm", "enterprise_value_fq", "enterprise_value_ebitda_ttm", "Perf.1M", "Perf.Y", "Perf.YTD", "Perf.3M", "Perf.6M", "Perf.W", "price_revenue_ttm", "Ichimoku.Lead2|1M", "Ichimoku.Lead1|1M", "ATR|1M", "average_volume_30d_calc", "average_volume_60d_calc", "average_volume_90d_calc", "average_volume_10d_calc", "relative_volume_10d_calc|1M", "Value.Traded|1M", "High.All", "Low.All", "gross_profit_fq", "goodwill", "name", "open|1M", "Low.1M", "Low.3M", "price_52_week_low", "Low.6M", "High.1M", "High.3M", "price_52_week_high", "High.6M", "earnings_release_next_date", "earnings_release_date", "high|1M", "SMA50|1M", "SMA30|1M", "SMA200|1M", "SMA20|1M", "SMA100|1M", "SMA10|1M", "EMA50|1M", "EMA200|1M", "EMA20|1M", "EMA100|1M", "EMA10|1M", "EMA30|1M", "HullMA9|1M", "VWMA|1M", "Stoch.RSI.K|1M", "Stoch.RSI.D|1M", "Ichimoku.CLine|1M", "Ichimoku.BLine|1M", "rtc", "low|1M", "Recommend.MA|1M", "Recommend.Other|1M", "Pivot.M.Woodie.R3|1M", "Pivot.M.Woodie.S3|1M", "Pivot.M.Woodie.S2|1M", "Pivot.M.Woodie.S1|1M", "Pivot.M.Woodie.R2|1M", "Pivot.M.Woodie.R1|1M", "Pivot.M.Woodie.Middle|1M", "Pivot.M.Fibonacci.S3|1M", "Pivot.M.Fibonacci.S2|1M", "price_book_ratio", "MACD.signal|1M", "change_from_open_abs|1M", "exchange", "number_of_shareholders", "net_income", "BBPower|1M", "current_ratio", "price_book_fq", "total_revenue", "total_debt", "total_current_assets", "gross_profit", "total_shares_outstanding_fundamental", "Stoch.K|1M", "total_assets", "ROC|1M", "dividends_per_share_fq", "revenue_per_employee", "dividends_yield", "return_on_invested_capital", "price_sales_ratio", "price_free_cash_flow_ttm", "return_on_assets", "return_on_equity", "debt_to_equity", "quick_ratio", "ADR|1M", "W.R|1M", "Pivot.M.Camarilla.Middle|1M", "Pivot.M.Camarilla.S1|1M", "Pivot.M.Camarilla.S2|1M", "Pivot.M.Camarilla.S3|1M", "Pivot.M.Classic.Middle|1M", "Pivot.M.Classic.R1|1M", "Pivot.M.Classic.R2|1M", "Pivot.M.Classic.R3|1M", "Pivot.M.Classic.S1|1M", "Pivot.M.Classic.S2|1M", "Pivot.M.Classic.S3|1M", "Pivot.M.Fibonacci.Middle|1M", "Pivot.M.Fibonacci.R1|1M", "Pivot.M.Fibonacci.R2|1M", "Pivot.M.Fibonacci.R3|1M", "Pivot.M.Fibonacci.S1|1M", "Pivot.M.Camarilla.R3|1M", "Pivot.M.Camarilla.R2|1M", "Pivot.M.Camarilla.R1|1M", "MACD.macd|1M", "net_debt", "Pivot.M.Demark.Middle|1M", "Pivot.M.Demark.R1|1M", "Pivot.M.Demark.S1|1M", "country", "Stoch.D|1M", "description", "name", "type", "subtype", "pricescale", "minmov", "fractional", "minmove2", "AO|1M", "AO[1]|1M", "ADX|1M", "ADX+DI|1M", "ADX-DI|1M", "ADX+DI[1]|1M", "ADX-DI[1]|1M", "P.SAR|1M", "open|1M", "Mom|1M", "Mom[1]|1M", "CCI20|1M", "CCI20[1]|1M", "RSI|1M", "RSI[1]|1M", "RSI7|1M", "RSI7[1]|1M", "Rec.UO|1M", "close|1M", "BB.lower|1M", "BB.upper|1M", "Candle.AbandonedBaby.Bearish|1M", "Candle.AbandonedBaby.Bullish|1M", "Candle.Engulfing.Bearish|1M", "Candle.Engulfing.Bullish|1M", "Candle.Harami.Bullish|1M", "Candle.Harami.Bearish|1M", "Candle.EveningStar|1M", "Candle.Doji.Gravestone|1M", "Candle.Hammer|1M", "Candle.HangingMan|1M", "Candle.InvertedHammer|1M", "Candle.Kicking.Bearish|1M", "Candle.Kicking.Bullish|1M", "Candle.Marubozu.Black|1M", "Candle.Marubozu.White|1M", "Candle.MorningStar|1M", "Candle.ShootingStar|1M", "Candle.3BlackCrows|1M", "Candle.3WhiteSoldiers|1M", "Candle.TriStar.Bearish|1M", "Candle.TriStar.Bullish|1M", "Candle.LongShadow.Lower|1M", "Candle.LongShadow.Upper|1M", "Candle.Doji|1M", "Candle.Doji.Dragonfly|1M", "Candle.SpinningTop.Black|1M", "Candle.SpinningTop.White|1M", "SMA50|1M", "SMA30|1M", "SMA200|1M", "SMA20|1M", "SMA100|1M", "SMA10|1M", "EMA50|1M", "EMA200|1M", "EMA20|1M", "EMA100|1M", "EMA10|1M", "EMA30|1M", "Rec.HullMA9|1M", "Rec.VWMA|1M", "Rec.Stoch.RSI|1M", "Rec.Ichimoku|1M", "current_session", "Rec.BBPower|1M", "Stoch.K|1M", "Stoch.D|1M", "Stoch.K[1]|1M", "Stoch.D[1]|1M", "Rec.WR|1M", "MACD.macd|1M", "MACD.signal|1M"], "sort": { "sortBy": "market_cap_basic", "sortOrder": "desc" }, "options": { "lang": "vi" }, "range": [0, 150] }
        axios.post(url, obj)
            .then(response => {
                console.log(response)
                if (response.data) {
                    this.gridApi.setRowData(response.data.data)
                    this.gridApi.sizeColumnsToFit()
                }

            })
            .catch(error => {
                console.log(error)
            })
    }
}