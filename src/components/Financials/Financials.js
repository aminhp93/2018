import React from 'react';
import axios from 'axios';
import { getYearlyFinancialInfoUrl, getQuarterlyFinancialInfoUrl } from '../../helpers/requests';
import CustomedTable from '../Ultilities/CustomedTable';
import { Table } from 'semantic-ui-react'
export default class Financials extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yearlyFinancialInfoObj: [],
            quarterlyFinancialInfoObj: [],
            revenueObj: {}
        }
    }

    renderRevenue() {
        return (
            // <Table celled>
            //     <Table.Header>
            //         <Table.Row>
            //             <Table.HeaderCell></Table.HeaderCell>
            //             <Table.HeaderCell></Table.HeaderCell>
            //             <Table.HeaderCell>2015</Table.HeaderCell>
            //             <Table.HeaderCell>2016</Table.HeaderCell>
            //             <Table.HeaderCell>2017</Table.HeaderCell>
            //             <Table.HeaderCell>2018</Table.HeaderCell>
            //         </Table.Row>
            //     </Table.Header>
            //     <Table.Body>
            //         {
            //             Object.keys(this.state.revenueObj).map(function (key) {
            //                 return (
            //                     <Table.Row>
            //                         <Table.Cell>Quarter {item.Quarter}</Table.Cell>
            //                         <Table.Cell>Chart</Table.Cell>
            //                         <Table.Cell>{(item.NetSales_MRQ / 1000000000).toFixed(2)}</Table.Cell>
            //                         <Table.Cell>1</Table.Cell>
            //                         <Table.Cell>1</Table.Cell>
            //                         <Table.Cell>1</Table.Cell>
            //                     </Table.Row>
            //                 )
            //             })
            //         }
            //     </Table.Body>
            // </Table>
            <div></div>
        )
    }

    renderProfit() {
        return null
    }

    renderFinancialCost() {
        return null
    }

    render() {
        return (
            <div>
                Financials
                {this.renderRevenue()}
                {this.renderProfit()}
                {this.renderFinancialCost()}

            </div>
        );
    }

    componentDidMount() {
        let url = getYearlyFinancialInfoUrl('FPT')
        axios.get(url)
            .then(response => {
                if (response.data) {
                    this.setState({
                        yearlyFinancialInfoObj: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
        url = getQuarterlyFinancialInfoUrl('FPT')
        axios.get(url)
            .then(response => {
                if (response.data) {
                    let revenueObj = response.data.reduce(function (a, b) { a[b.Quarter] = a[b.Quarter] || []; a[b.Quarter].push(b); return a; }, Object.create(null));
                    this.setState({
                        revenueObj: revenueObj
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });

    }
}