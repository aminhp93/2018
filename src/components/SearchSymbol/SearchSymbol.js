import React from 'react';
import axios from 'axios';
import { getTradingStatisticUrl } from '../../helpers/requests';
import dataStorage from '../../dataStorage';

export default class SearchSymbol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbolObj: ''
        }
    }

    handleOnChange(e) {
        const symbol = e.target.value;
        console.log(dataStorage)
        if (symbol) {
            this.setState({
                symbolObj: symbol
            })
            this.props.dataReceivedFromSearchSymbol(symbol);
        }
    }

    render() {
        return (
            <div>
                <input
                    placeholder='Search Symbol'
                    onChange={this.handleOnChange.bind(this)} />
                <div>
                    {this.state.symbolObj}
                </div>
            </div>
        );
    }

    componentDidMount() {

    }
}