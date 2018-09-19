import React from 'react';
import axios from 'axios';
import { getHistoricalQuotesBeforeUrl, getPivotPointsUrl, getTechnicalIndicatorsUrl, getMovingAveragesUrl } from '../../helpers/requests';
export default class TechnicalAnanlysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            historicalQuotesBeforeObj: [],
            pivotPointsObj: [],
            technicalIndicatorsObj: [],
            movingAveragesObj: []
        }
    }

    renderSummary() {
        return null
    }

    renderPivotPoints() {
        return null
    }

    renderTechnicalIndicators() {
        return null
    }

    renderMovingAverages() {
        return null
    }

    render() {
        return (
            <div>
                TechnicalAnanlysis
                {this.renderSummary()}
                {this.renderPivotPoints()}
                {this.renderTechnicalIndicators()}
                {this.renderMovingAverages()}

            </div>
        );
    }

    componentDidMount() {
        let url = getHistoricalQuotesBeforeUrl('FPT')
        axios.get(url)
            .then(response => {
                if (response.data) {
                    this.setState({
                        historicalQuotesBeforeObj: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
        url = getPivotPointsUrl()
        axios.get(url)
            .then(response => {
                if (response.data) {
                    this.setState({
                        pivotPointsObj: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
        url = getTechnicalIndicatorsUrl()
        axios.get(url)
            .then(response => {
                if (response.data) {
                    this.setState({
                        technicalIndicatorsObj: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
        url = getMovingAveragesUrl()
        axios.get(url)
            .then(response => {
                if (response.data) {
                    this.setState({
                        movingAveragesObj: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }
}