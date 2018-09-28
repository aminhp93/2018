import React from 'react';
import axios from 'axios';
import { getIntradayQuotesUrl } from '../../helpers/requests';
import { Table } from 'semantic-ui-react'

export default class CanslimStandard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intradayObj: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.symbol) {
            this.setState({
                symbol: nextProps.symbol
            }, () => {
                const url = getIntradayQuotesUrl(this.state.symbol)
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
            })

        }
    }

    render() {
        return (
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Standard</Table.HeaderCell>
                            <Table.HeaderCell>Detail</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>1.</Table.Cell>
                            <Table.Cell>{this.state.intradayObj.Price}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>2.</Table.Cell>
                            <Table.Cell>{this.state.intradayObj.Price}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>3.</Table.Cell>
                            <Table.Cell>{this.state.intradayObj.Price}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>4.</Table.Cell>
                            <Table.Cell>{this.state.intradayObj.Price}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>5.</Table.Cell>
                            <Table.Cell>{this.state.intradayObj.Price}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>6.</Table.Cell>
                            <Table.Cell>{this.state.intradayObj.Price}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>7.</Table.Cell>
                            <Table.Cell>{this.state.intradayObj.Price}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }

    componentDidMount() {

    }
}