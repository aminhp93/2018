import React from 'react';

const interest = 1.2
const stoploss = 0.93

class DetailOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: 0
        }
    }

    handleOnChange(e) {
        this.setState({
            price: e.target.value
        })
    }

    render() {
        return (
            <div>
                <div className='row'>
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


            </div>

        )
    }
}

export default DetailOrder
