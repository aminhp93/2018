import React from 'react';
import axios from 'axios';
import { getIntradayQuotesUrl } from '../../helpers/requests';
import { Table } from 'semantic-ui-react'

export default class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intradayObj: {}
        }
    }

    render() {
        return (
            <div>
                Transaction - {this.state.intradayObj.Price}

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>GIA</Table.HeaderCell>
                            <Table.HeaderCell>+/-</Table.HeaderCell>
                            <Table.HeaderCell>%</Table.HeaderCell>
                            <Table.HeaderCell>INTRADAY</Table.HeaderCell>
                            <Table.HeaderCell>KHOI LUONG</Table.HeaderCell>
                            <Table.HeaderCell>THAM CHIEU</Table.HeaderCell>
                            <Table.HeaderCell>MO CUA</Table.HeaderCell>
                            <Table.HeaderCell>CAO NHAT</Table.HeaderCell>
                            <Table.HeaderCell>THAP NHAT</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>{this.state.intradayObj.Price}</Table.Cell>
                            <Table.Cell>{this.state.intradayObj.Price}</Table.Cell>
                            <Table.Cell>{this.state.intradayObj.Price}</Table.Cell>
                            <Table.Cell>{this.state.intradayObj.Price}</Table.Cell>
                            <Table.Cell>{this.state.intradayObj.TotalVolume}</Table.Cell>
                            <Table.Cell>{this.state.intradayObj.Price}</Table.Cell>
                            <Table.Cell>{this.state.intradayObj.Price}</Table.Cell>
                            <Table.Cell>{this.state.intradayObj.Price}</Table.Cell>
                            <Table.Cell>{this.state.intradayObj.Price}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }

    componentDidMount() {
        const url = getIntradayQuotesUrl('FPT')
        axios.get(url)
            .then(response => {
                if (response.data && response.data.length) {
                    let intradayObj = response.data[response.data.length - 1]
                    this.setState({
                        intradayObj: intradayObj
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }
}