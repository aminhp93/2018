import React from 'react';
import axios from 'axios';
import { getMajorHoldersUrl, getTimescaleMarksUrl } from '../../helpers/requests';
import { Tab } from 'semantic-ui-react';
// import CustomedTab from '../Ultilities/CustomedTab/';


export default class Shareholder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            majorHoldersObj: [],
            timescaleObj: []
        }

        this.panes = [
            { menuItem: 'Tat ca', render: () => <Tab.Pane ></Tab.Pane> },
            { menuItem: 'Ca nhan', render: () => <Tab.Pane></Tab.Pane> },
            { menuItem: 'To chuc', render: () => <Tab.Pane></Tab.Pane> }
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