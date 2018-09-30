import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as symbolActions from '../../actions/symbol.actions';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { translate, Trans } from 'react-i18next';

import config from '../../config';
import { load } from '../../helpers/spreadsheet';

class DailyWatchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                {
                    headerName: "Id", field: "id"
                },
                {
                    headerName: "Symbol",
                    field: "symbol",
                    cellRenderer: (params) => {
                        return params.data[0]
                    }
                }
            ],
            rowData: []
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
                window.gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId: '13N4g7RtKQ2nr47ZDEqGkkRMwcVBCDjoVb-Sxf00elRY',
                    range: 'Potentials!A:A',
                }).then(function (response) {
                    const rowData = response.result.values
                    if (rowData) {
                        that.setState({
                            rowData: rowData
                        })
                    }
                }, function (response) {
                    // appendPre('Error: ' + response.result.error.message);
                });
            });
    };

    onRowClicked(row) {
        console.log(row)
        if (row.data && row.data.length) {
            const symbol = row.data[0]
            this.props.actions.changeSymbol(symbol)
        }
    }

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
                        rowData={this.state.rowData}
                        onRowClicked={this.onRowClicked.bind(this)} />
                </div>
            </div>
        );
    }

    componentDidMount() {
        window.gapi.load("client", this.initClient);
    }
}

function mapStateToProps(state) {
    return {
        symbol: state.symbol.symbol
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(symbolActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(DailyWatchlist));
