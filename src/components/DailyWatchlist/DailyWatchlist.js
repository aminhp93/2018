import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as symbolActions from '../../actions/symbol.actions';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { translate, Trans } from 'react-i18next';
import config from '../../config';

class DailyWatchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
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
        // this.handleChangeCategory = this.handleChangeCategory.bind(this)
    }

    initClient(sheet) {
        const that = this;
        // if (!window.gapi.client) return;
        window.gapi.client
            .init({
                apiKey: config.apiKey,
                clientId: config.clientId,
                discoveryDocs: config.discoveryDocs,
                scope: config.scope
            })
            .then((error) => {
                window.gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId: '1vXd3YLlYHbSH0J_zo0W2w7cfxqFp9MIiK5y-rYDkbO4',
                    range: `${sheet ? sheet : 'Potentials'}!A:A`,
                }).then(function (response) {
                    const rowData = response.result.values
                    if (rowData) {
                        that.setState({
                            rowData: rowData
                        })
                    }
                }, function (response) {
                });
            });
    };

    onRowClicked(row) {
        if (row.data && row.data.length) {
            const symbol = row.data[0]
            this.props.actions.changeSymbol(symbol)
        }
    }

    handleOnChangeSheet(e) {
        const sheet = e.target.value;
        if (sheet && sheet.length > 3) {
            this.initClient(sheet)
        }

    }
    handleChangeCategory(category) {
        if (!category) return
        switch (category) {
            case 'daily':
                this.initClient('1/10')
                break;
            case 'potentials':
                this.initClient('Potentials')
                break;
            case 'onmarket':
                this.initClient('OnMarket')
                break;
            case 'filter':
                this.initClient('OnMarket')
                break;
            default:
                this.initClient('Potentials')
                break;
        }
    }

    render() {
        return (
            <div>

                <input
                    placeholder='Add sheet'
                    onChange={this.handleOnChangeSheet.bind(this)} />
                <div onClick={() => this.handleChangeCategory('daily')}>
                    Daily
                </div>
                <div onClick={() => this.handleChangeCategory('potentials')}>
                    Potentials
                </div>
                <div onClick={() => this.handleChangeCategory('onmarket')}>
                    OnMarkets
                </div>
                <div onClick={() => this.handleChangeCategory('filter')}>
                    Filter
                </div>

                <div
                    className="ag-theme-balham"
                    style={{
                        height: '500px',
                        width: '600px'
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        onRowClicked={this.onRowClicked.bind(this)} />
                </div>
            </div>
        );
    }

    componentDidMount() {
        window.gapi.load("client", this.initClient.bind(this));
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
