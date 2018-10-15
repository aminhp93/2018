import React from 'react';
import axios from 'axios';
import { getIntradayMarketStatisticUrl } from '../../helpers/requests';
import { Table } from 'semantic-ui-react';
import { Tab } from 'semantic-ui-react';
import ChartTV from '../ChartTV';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as symbolActions from '../../actions/symbol.actions';
import { translate, Trans } from 'react-i18next';

class MarketWatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getIntradayMarketStatisticObj: {}
        }
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
                this.getIntradayMarketStatisticData('HOSTC')
                this.props.actions.changeSymbol('HOSTC')

                break
            case 8:
                this.getIntradayMarketStatisticData('HASTC')
                this.props.actions.changeSymbol('HASTC')

                break
            case 9:
                this.getIntradayMarketStatisticData('UPCOM')
                this.props.actions.changeSymbol('UPCOM')

                break
            default:
                console.log('default')
                break
        }
    }
    renderTab1() {
        return <div>
            <ChartTV />
            <div className='marketInfo'>
                <div className='green'>
                    {this.state.getIntradayMarketStatisticObj.Advances} -
                </div>
                <div>
                    {this.state.getIntradayMarketStatisticObj.Unchange} -
                </div>
                <div className='red'>
                    {this.state.getIntradayMarketStatisticObj.Declines}
                </div>

            </div>
        </div>
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
            { menuItem: 'Tong quan', render: () => <Tab.Pane>{this.renderTab1()}</Tab.Pane> },
            { menuItem: 'Bien dong thi truong', render: () => <Tab.Pane>{this.renderTab2()}</Tab.Pane> },
            { menuItem: 'Nuoc ngoai', render: () => <Tab.Pane>{this.renderTab3()}</Tab.Pane> },
            { menuItem: 'Cung cau', render: () => <Tab.Pane>{this.renderTab4()}</Tab.Pane> },
            { menuItem: 'TOP co phieu', render: () => <Tab.Pane>{this.renderTab5()}</Tab.Pane> },
            { menuItem: 'Du lieu lich su', render: () => <Tab.Pane>{this.renderTab6()}</Tab.Pane> },
        ]
        return (
            <div className='marketWatch'>
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
                <Tab className='tabContainer' panes={panes} onTabChange={this.handleOnChangeTab.bind(this)} />
            </div>
        );
    }

    getIntradayMarketStatisticData(stockExchange) {
        const url = getIntradayMarketStatisticUrl(stockExchange)
        axios.get(url)
            .then(response => {
                if (response.data && response.data.length) {
                    this.setState({
                        getIntradayMarketStatisticObj: response.data[response.data.length - 1]
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.getIntradayMarketStatisticData('HOSTC')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(symbolActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(translate('translations')(MarketWatch));
