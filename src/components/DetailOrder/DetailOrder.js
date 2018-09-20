import React from 'react';
import axios from 'axios';
// import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { getCompanyInfoUrl } from '../../helpers/requests';
import Transaction from '../Transaction';
import Profile from '../Profile';
import Shareholder from '../Shareholder';
import CapitalAndDividend from '../CapitalAndDividend';
import News from '../News';
import Price from '../Price';
import Financials from '../Financials';
import TechnicalAnalysis from '../TechnicalAnalysis';
import { Tab } from 'semantic-ui-react'
import CustomedTab from '../Ultilities/CustomedTab/CustomedTab';

const panes = [
    { menuItem: 'Transaction', render: () => <Tab.Pane> <Transaction /></Tab.Pane> },
    { menuItem: 'Profile', render: () => <Tab.Pane> <Profile /></Tab.Pane> },
    { menuItem: 'Shareholders', render: () => <Tab.Pane> <Shareholder /></Tab.Pane> },
    { menuItem: 'Capital and Dividend', render: () => <Tab.Pane> <CapitalAndDividend /></Tab.Pane> },
    { menuItem: 'News', render: () => <Tab.Pane> <News /></Tab.Pane> },
    { menuItem: 'Price', render: () => <Tab.Pane> <Price /></Tab.Pane> },
    { menuItem: 'Financials', render: () => <Tab.Pane> <Financials /></Tab.Pane> },
    { menuItem: 'Technical Analysis', render: () => <Tab.Pane> <TechnicalAnalysis /></Tab.Pane> },
]
const interest = 1.2
// const stoploss = 0.93

class DetailOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: 0,
            companyObj: {},
            columnDefs: [
                { headerName: "Make", field: "make" },
                { headerName: "Model", field: "model" },
                { headerName: "Price", field: "price" }

            ],
            rowData: [
                { make: "Toyota", model: "Celica", price: 35000 },
                { make: "Ford", model: "Mondeo", price: 32000 },
                { make: "Porsche", model: "Boxter", price: 72000 }
            ]
        }
    }

    handleOnChange(e) {
        this.setState({
            price: e.target.value
        })
    }

    render() {
        return (
            <div className='detailOrder'>
                {/* <div className='row'>
                    <div>
                        Price
                    </div>
                    <div>
                        <input value={this.state.price} onChange={this.handleOnChange.bind(this)} />
                    </div>
                </div>
                <div className='row'>
                    <div>
                        Current 1
                    </div>
                    <div>
                        {this.state.price * interest}
                    </div>
                </div>
                <div className='row'>
                    <div>
                        Current 2
                    </div>
                    <div>
                        {this.state.price * interest}
                    </div>
                </div>
                <div>
                    Company Name: {this.state.companyObj.InternationalName || ''}
                </div> */}
                {/* <div
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
                </div> */}
                <Tab panes={panes} />
                <CustomedTab panes={panes} />
            </div>
        )
    }

    componentDidMount() {
        // const url = getCompanyInfoUrl('FPT')
        // axios.get(url)
        //     .then(response => {
        //         if (response.data) {
        //             this.setState({
        //                 companyObj: response.data
        //             })
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error.response)
        //     });
    }
}

export default DetailOrder
