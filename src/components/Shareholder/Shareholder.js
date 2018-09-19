import React from 'react';
import axios from 'axios';
import { getMajorHoldersUrl, getTimescaleMarksUrl } from '../../helpers/requests';
import { Tab } from 'semantic-ui-react';
import CustomedTabPane from '../Ultilities/CustomedTabPane/';


export default class Shareholder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            majorHoldersObj: [],
            timescaleObj: []
        }

        this.panes = [
            { menuItem: 'Tat ca', render: () => <CustomedTabPane title='AllShareholders' data={this.state.majorHoldersObj} /> },
            { menuItem: 'Ca nhan', render: () => <CustomedTabPane title='Individuals' /> },
            { menuItem: 'To chuc', render: () => <CustomedTabPane title='Organizations' /> }
        ]
    }

    render() {
        return (
            <div>
                Shareholder
                <Tab panes={this.panes} />
            </div>
        );
    }

    componentDidMount() {
        let url = getMajorHoldersUrl('FPT')
        axios.get(url)
            .then(response => {
                if (response.data) {
                    this.setState({
                        majorHoldersObj: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });

        url = getTimescaleMarksUrl('FPT')
        axios.get(url)
            .then(response => {
                if (response.data) {
                    this.setState({
                        timescaleObj: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }
}