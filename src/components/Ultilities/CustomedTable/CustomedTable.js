import React from 'react';
import { Table } from 'semantic-ui-react'

export default class CustomedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intradayObj: {}
        }
    }
    render() {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Ten</Table.HeaderCell>
                        <Table.HeaderCell>So CP</Table.HeaderCell>
                        <Table.HeaderCell>TY LE</Table.HeaderCell>
                        <Table.HeaderCell>NGAY CAP NHAT</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.props.data && this.props.data.map(item => {
                        return <Table.Row>
                            <Table.Cell>{item.Name} - {item.Position ? item.Position : (item.IsForeigner ? 'To chuc nuoc ngoai' : 'To chuc trong nuoc')}</Table.Cell>
                            <Table.Cell>{item.Shares}</Table.Cell>
                            <Table.Cell>{item.Shares / 100}</Table.Cell>
                            <Table.Cell>{item.Reported}</Table.Cell>
                        </Table.Row>
                    })}

                </Table.Body>
            </Table>
        );
    }
}