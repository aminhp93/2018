import React from 'react';
import axios from 'axios';
import { getTradingStatisticUrl } from '../../helpers/requests';
import dataStorage from '../../dataStorage';
import { AgGridReact } from 'ag-grid-react';

export default class FilterSystem extends React.Component {
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
                    headerName: "Date",
                    field: "Date"
                }
            ],
            rowData: []
        }

        this.defaultColDef = {
            width: 100
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

                    />
                </ div >
            )
        } else {
            return <div>No data</div>
        }

    }

    render() {
        return (
            <div className='filterSystem'>
                FilterSystem
                {this.renderContent()}
            </div>
        );
    }

    componentDidMount() {
        const url = getTradingStatisticUrl();
        axios.get(url)
            .then(response => {
                if (response.data) {
                    let allSymbolsArray = response.data;
                    let allSymbolsString = ''
                    for (let i = 0; i < allSymbolsArray.length; i++) {
                        allSymbolsString += ',' + allSymbolsArray[i].Symbol
                    }
                    dataStorage.allSymbolsString = allSymbolsString
                    this.setState({
                        allSymbolsArray
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }
}