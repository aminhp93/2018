import React from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import config from '../../config';
import { load } from '../../helpers/spreadsheet';

export default class DailyWatchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                { headerName: "Id", field: "id" },
                {
                    headerName: "Symbol",
                    field: "symbol",
                    cellRenderer: (params) => {
                        console.log(params)
                        return params.data[0]
                    }
                }
            ],
            rowData: [
                // { make: "Toyota", model: "Celica", price: 35000 },
                // { make: "Ford", model: "Mondeo", price: 32000 },
                // { make: "Porsche", model: "Boxter", price: 72000 }
            ]
        }
    }

    initClient = () => {
        // 2. Initialize the JavaScript client library.
        const that = this;
        window.gapi.client
            .init({
                apiKey: config.apiKey,
                clientId: config.clientId,
                discoveryDocs: config.discoveryDocs,
                scope: config.scope
            })
            .then((error) => {
                // console.log(error)
                // 3. Initialize and make the API request.
                // load(this.onLoad);
                window.gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId: '13N4g7RtKQ2nr47ZDEqGkkRMwcVBCDjoVb-Sxf00elRY',
                    range: 'Potentials!A:A',
                }).then(function (response) {
                    console.log(response, response.result.values)

                    const rowData = response.result.values
                    if (rowData) {
                        that.setState({
                            rowData: rowData
                        })
                    }
                    // this.setState({
                    //     rowData: response.result.values
                    // })
                }, function (response) {
                    // appendPre('Error: ' + response.result.error.message);
                });
            });
    };

    render() {
        return (
            <div>
                <div>
                    DailyWatchlist
                </div>
                <div
                    className="ag-theme-balham"
                    style={{
                        height: '500px',
                        width: '600px'
                    }}
                >
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}>
                    </AgGridReact>
                </div>
            </div>
        );
    }

    componentDidMount() {
        window.gapi.load("client", this.initClient);
    }
}
