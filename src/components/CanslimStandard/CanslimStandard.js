import React from 'react';
import axios from 'axios';
import { getLatestFinancialInfoUrl, getIntradayQuotesUrl, getHistoricalQuotesUrl, getCompanyNewsUrl } from '../../helpers/requests';
import { Table } from 'semantic-ui-react'

export default class CanslimStandard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbolObj: {},
            symbol: '',
            latestFinancialInfoObj: {},
            intradayQuotesArray: [],
            historicalQuotesArray: [],
            companyNewsArray: []
        }
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.symbol && nextProps.symbol.length > 2) {
            let url = getLatestFinancialInfoUrl(nextProps.symbol)
            let latestFinancialInfoObj = {}
            let intradayQuotesArray = []
            let historicalQuotesArray = []
            let companyNewsArray = []

            await axios.get(url)
                .then(response => {
                    if (response.data) {
                        latestFinancialInfoObj = response.data

                    }
                })
                .catch(error => {
                    console.log(error.response)
                });
            url = getIntradayQuotesUrl(nextProps.symbol)
            await axios.get(url)
                .then(response => {
                    if (response.data && response.data.length) {
                        intradayQuotesArray = response.data
                    }
                })
                .catch(error => {
                    console.log(error.response)
                });
            url = getHistoricalQuotesUrl(nextProps.symbol)
            await axios.get(url)
                .then(response => {
                    if (response.data && response.data.length) {
                        historicalQuotesArray = response.data
                    }
                })
                .catch(error => {
                    console.log(error.response)
                });
            url = getCompanyNewsUrl(nextProps.symbol)
            await axios.get(url)
                .then(response => {
                    if (response.data && response.data.length) {
                        companyNewsArray = response.data
                    }
                })
                .catch(error => {
                    console.log(error.response)
                });
            this.setState({
                symbol: nextProps.symbol,
                latestFinancialInfoObj,
                intradayQuotesArray,
                historicalQuotesArray,
                companyNewsArray
            })

        }
    }

    checkCurrentEPS() {
        const EPS = this.state.latestFinancialInfoObj.EPS;
        if (EPS) {
            if (EPS > 3000) {
                return <div className='green'>{EPS.toFixed(0)}</div>
            } else {
                return <div className='red'>{EPS.toFixed(0)}</div>
            }
        } else {
            return <div>No data</div>
        }
    }

    checkEarningIncreases() {
        const ROE = this.state.latestFinancialInfoObj.ROE;
        if (ROE) {
            if (ROE > 0.17) {
                return <div className='green'>{(ROE * 100).toFixed(0)}%</div>
            } else {
                return <div className='red'>{(ROE * 100).toFixed(0)}%</div>
            }
        } else {
            return <div>No data</div>
        }
    }

    checkNewHighs() {
        const companyNewsArray = this.state.companyNewsArray;
        if (companyNewsArray && companyNewsArray.length) {
            return <div>
                {
                    companyNewsArray.map(item => {
                        return <div key={item.NewsID}>
                            <a href={item.NewsUrl} target="_blank" rel="noopener noreferrer">{item.Title}</a>
                        </div>
                    })
                }
            </div>
        } else {
            return <div>No data</div>
        }
    }

    checkSupplyDemand() {
        const intradayQuotesArray = this.state.intradayQuotesArray
        const historicalQuotesArray = this.state.historicalQuotesArray
        if (intradayQuotesArray && intradayQuotesArray.length > 0) {
            let sumVolumeLast10Days = 0
            let averageVolumnLast10Days = 0
            if (historicalQuotesArray && historicalQuotesArray.length > 0) {
                for (let i = 0; i < 10; i++) {
                    sumVolumeLast10Days += historicalQuotesArray[historicalQuotesArray.length - i - 1].Volume
                }
                averageVolumnLast10Days = sumVolumeLast10Days / 10
            }
            const lastIntradayQuote = intradayQuotesArray[intradayQuotesArray.length - 1]
            return <div className={lastIntradayQuote.TotalVolume > averageVolumnLast10Days ? 'green' : 'red'}>
                {lastIntradayQuote.TotalVolume} - {averageVolumnLast10Days}
            </div>
        } else {
            return <div>No data</div>
        }
    }

    checkLeaderLaggard() {
        return <div>No data</div>
    }

    checkInstitutionalSponsorship() {
        return <div>No data</div>
    }
    checkMarketDirection() {
        return <div>No data</div>
    }

    render() {
        return (
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Standard</Table.HeaderCell>
                            <Table.HeaderCell>Detail - {this.state.symbol || 'No Symbol'}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>1. Current EPS</Table.Cell>
                            <Table.Cell>{this.checkCurrentEPS()}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>2. Periodicaly Earning Increases</Table.Cell>
                            <Table.Cell>{this.checkEarningIncreases()}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>3. New Products, New Management</Table.Cell>
                            <Table.Cell>{this.checkNewHighs()}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>4. Supply/Demand</Table.Cell>
                            <Table.Cell>{this.checkSupplyDemand()}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>5. Leader/Laggard</Table.Cell>
                            <Table.Cell>{this.checkLeaderLaggard()}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>6. Institutional Sponsorship</Table.Cell>
                            <Table.Cell>{this.checkInstitutionalSponsorship()}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>7. Market Direction</Table.Cell>
                            <Table.Cell>{this.checkMarketDirection()}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }

    componentDidMount() {

    }
}