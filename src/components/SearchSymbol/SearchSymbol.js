import React from 'react';

export default class SearchSymbol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbolObj: ''
        }
    }

    handleOnChange(e) {
        console.log(e)
        const symbol = e.target.value;
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
                    onChange={this.handleOnChange.bind(this)} />
                <div>
                    {this.state.symbolObj}
                </div>
            </div>
        );
    }
}