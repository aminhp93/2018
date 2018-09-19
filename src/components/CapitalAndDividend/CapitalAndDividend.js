import React from 'react';
import axios from 'axios';
import { getEquityAndDividendsUrl } from '../../helpers/requests';
export default class CapitalAndDividend extends React.Component {

    render() {
        return (
            <div>
                CapitalAndDividend

           </div>
        );
    }
    componentDidMount() {
        const url = getEquityAndDividendsUrl('FPT')
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