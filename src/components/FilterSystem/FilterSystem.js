import React from 'react';
import axios from 'axios';
import { getTradingStatisticUrl } from '../../helpers/requests';
import dataStorage from '../../dataStorage';
import { AgGridReact } from 'ag-grid-react';

export default class FilterSystem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allSymbolsArray: dataStorage.allSymbolsString || [],
            columnDefs: [
                {
                    headerName: "Symbol",
                    field: "Symbol",
                    getQuickFilterText: function (params) {
                        return params.data.Symbol;
                    }
                },
                {
                    headerName: "AvgPrice5d",
                    field: "AvgPrice5d"
                },
                {
                    headerName: "AvgVolume5d",
                    field: "AvgVolume5d"
                },
                {
                    headerName: "HighPrice1w",
                    field: "HighPrice1w"
                },
                {
                    headerName: "LowPrice1w",
                    field: "LowPrice1w"
                },
                {
                    headerName: "PriceChange1w",
                    field: "PriceChange1w"
                },
                {
                    headerName: "BuyCount1w",
                    field: "BuyCount1w"
                },
                {
                    headerName: "SellCount1w",
                    field: "SellCount1w"
                },
                {
                    headerName: "BuyQuantity1w",
                    field: "BuyQuantity1w"
                },
                {
                    headerName: "SellQuantity1w",
                    field: "SellQuantity1w"
                },
                {
                    headerName: "AvgTradingSpeed10d",
                    field: "AvgTradingSpeed10d"
                },
                {
                    headerName: "SharesOutStanding",
                    field: "SharesOutStanding"
                },
                {
                    headerName: "AvgPrice4d",
                    field: "AvgPrice4d"
                },
                {
                    headerName: "StdEV19d",
                    field: "StdEV19d"
                },
                {
                    headerName: "EMA5d",
                    field: "EMA5d"
                },
                {
                    headerName: "DEMA5d",
                    field: "DEMA5d"
                },
                {
                    headerName: "TEMA5d",
                    field: "TEMA5d"
                },
                {
                    headerName: "TEMA5d",
                    field: "TEMA5d"
                },
                {
                    headerName: "TEMA5d",
                    field: "TEMA5d"
                },
                {
                    headerName: "TEMA5d",
                    field: "TEMA5d"
                },
                {
                    headerName: "TEMA5d",
                    field: "TEMA5d"
                },
                {
                    headerName: "TEMA5d",
                    field: "TEMA5d"
                },
                {
                    headerName: "TEMA5d",
                    field: "TEMA5d"
                },
                {
                    headerName: "Date",
                    field: "Date"
                }
            ],
            rowData: []
        }

        this.defaultColDef = {
            width: 120,
            editable: true,
            filter: 'agTextColumnFilter'
        }
    }

    onGridReady(params) {
        this.gridApi = params;
    }

    renderContent() {
        if (this.state.allSymbolsArray.length > 0) {
            return (
                <div
                    className="ag-theme-balham"
                    style={{
                        height: '100%'
                    }}
                >
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.allSymbolsArray}
                        defaultColDef={this.defaultColDef}
                        onGridReady={this.onGridReady.bind(this)}
                    />
                </ div >
            )
        } else {
            return <div>No data</div>
        }

    }

    render() {
        const that = this
        return (
            <div className='filterSystem'>
                FilterSystem
                <input onChange={(e) => {
                    if (e.target.value) {
                        that.gridApi && that.gridApi.api.setQuickFilter(e.target.value)
                    }
                }} />
                {this.renderContent()}
            </div>
        );
    }

    componentDidMount() {
    }
}