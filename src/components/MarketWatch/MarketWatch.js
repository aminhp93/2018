import React from 'react';
import axios from 'axios';
import { getYearlyFinancialInfoUrl, getQuarterlyFinancialInfoUrl } from '../../helpers/requests';
import { Table } from 'semantic-ui-react'
import { Tab } from 'semantic-ui-react'

export default class MarketWatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderContent() {
        return (
            <div></div>
        )
    }

    handleOnClick(index) {
        switch (index) {
            case 1:
                console.log(1)
                break
            case 2:
                console.log(2)
                break
            case 3:
                break
            case 4:
                break
            case 5:
                break
            case 6:
                break
            case 7:
                break
            case 8:
                break
            case 9:
                break
            default:
                console.log('default')
                break
        }
    }
    renderTab1() {
        return <div>1 - {Math.random()}</div>
    }

    renderTab2() {
        return <div>2 - {Math.random()}</div>
    }

    renderTab3() {
        return <div>3 - {Math.random()}</div>
    }

    renderTab4() {
        return <div>4 - {Math.random()}</div>
    }

    renderTab5() {
        return <div>5 - {Math.random()}</div>
    }

    renderTab6() {
        return <div>6 - {Math.random()}</div>
    }

    handleOnChangeTab(e, data) {
        console.log(e, data)

    }

    render() {
        const that = this;
        const panes = [
            { menuItem: 'Tong quan', render: () => <Tab.Pane>123</Tab.Pane> },
            { menuItem: 'Bien dong thi truong', render: () => <Tab.Pane>{this.renderTab2()}</Tab.Pane> },
            { menuItem: 'Nuoc ngoai', render: () => <Tab.Pane>{this.renderTab3()}</Tab.Pane> },
            { menuItem: 'Cung cau', render: () => <Tab.Pane>{this.renderTab4()}</Tab.Pane> },
            { menuItem: 'TOP co phieu', render: () => <Tab.Pane>{this.renderTab5()}</Tab.Pane> },
            { menuItem: 'Du lieu lich su', render: () => <Tab.Pane>{this.renderTab6()}</Tab.Pane> },
        ]
        const panes2 = [
            { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
            { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
            { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
        ]
        return (
            <div>
                <div className='stockExchangeContainer'>
                    <div onClick={() => this.handleOnClick(7)}>
                        HSX
                    </div>
                    <div onClick={() => this.handleOnClick(8)}>
                        HNX
                    </div>
                    <div onClick={() => this.handleOnClick(9)}>
                        UPCOM
                    </div>
                </div>
                <Tab panes={panes} onTabChange={this.handleOnChangeTab.bind(this)} />
                <Tab panes={panes2} renderActiveOnly={true} />

            </div>
        );
    }

    componentDidMount() {
        let url = getYearlyFinancialInfoUrl('FPT')
        axios.get(url)
            .then(response => {
                if (response.data) {
                    this.setState({
                        yearlyFinancialInfoObj: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
        url = getQuarterlyFinancialInfoUrl('FPT')
        axios.get(url)
            .then(response => {
                if (response.data) {
                    let revenueObj = response.data.reduce(function (a, b) { a[b.Quarter] = a[b.Quarter] || []; a[b.Quarter].push(b); return a; }, Object.create(null));
                    this.setState({
                        revenueObj: revenueObj
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });

    }
}