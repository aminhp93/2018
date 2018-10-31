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
                    return params.data.d[4]
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