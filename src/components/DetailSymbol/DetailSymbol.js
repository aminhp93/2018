import React from 'react';
import SearchSymbol from '../SearchSymbol';
import Transaction from '../Transaction/Transaction';
import CanslimStandard from '../CanslimStandard/CanslimStandard';
import BusinessSummary from '../BusinessSummary/BusinessSummary';
import BusinessSummary1 from '../BusinessSummary1/BusinessSummary1';
import BusinessSummary2 from '../BusinessSummary2/BusinessSummary2';
import BusinessSummary3 from '../BusinessSummary3/BusinessSummary3';
import BusinessSummary4 from '../BusinessSummary4/BusinessSummary4';
import { translate, Trans } from 'react-i18next';
import { getLatestFinancialInfoUrl, getIntradayQuotesUrl, getCompanyHistoricalQuotesUrl, getCompanyNewsUrl, getLastestFinancialReports_1 } from '../../helpers/requests';
import axios from 'axios';
import { Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as symbolActions from '../../actions/symbol.actions';
import { AgGridReact } from 'ag-grid-react';
import durationReportEnums from '../../constants/durationReportEnums'


class DetailSymbol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: props.symbol,
            showFinancialReport: true,
            durationReport: durationReportEnums.YEAR
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.symbol) {
            this.setState({
                symbol: nextProps.symbol
            })
        }
    }

    dataReceivedFromSearchSymbol(symbol) {
        this.setState({
            symbol: symbol
        })
    }
    handleOnTabChange(index, data) {
        console.log(index, data)
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

    handleChangeDurationReport(index) {
        this.setState({
            durationReport: index === durationReportEnums.QUARTER ? durationReportEnums.QUARTER : durationReportEnums.YEAR
        })
    }

    renderTab7() {
        const panes = [
            { menuItem: 'Can doi ke toan', render: () => <Tab.Pane className='tabBusinessSummary'><BusinessSummary typeBusinessSummary='1' durationReport={this.state.durationReport} symbol={this.state.symbol} /></Tab.Pane> },
            { menuItem: 'Ket qua kinh doanh', render: () => <Tab.Pane className='tabBusinessSummary'><BusinessSummary typeBusinessSummary='2' durationReport={this.state.durationReport} symbol={this.state.symbol} /></Tab.Pane> },
            { menuItem: 'Luu chuyen tien te - Truc tiep', render: () => <Tab.Pane className='tabBusinessSummary'><BusinessSummary typeBusinessSummary='3' durationReport={this.state.durationReport} symbol={this.state.symbol} /></Tab.Pane> },
            { menuItem: 'Luu chuyen tien te - Gian tiep', render: () => <Tab.Pane className='tabBusinessSummary'><BusinessSummary typeBusinessSummary='4' durationReport={this.state.durationReport} symbol={this.state.symbol} /></Tab.Pane> }
        ]
        return <div className='finances'>7 - {Math.random()}
            <div onClick={this.handleShowFinancialReport.bind(this)} className='btn'>{this.state.showFinancialReport ? 'Hide' : 'Show'} Bao cao tai chinh</div>
            <div className='durationReportSelection'>
                <div onClick={() => this.handleChangeDurationReport(durationReportEnums.QUARTER)} className={this.state.durationReport === durationReportEnums.QUARTER ? 'selected' : 'unselect'}>Hang quy</div>
                <div onClick={() => this.handleChangeDurationReport(durationReportEnums.YEAR)} className={this.state.durationReport === durationReportEnums.QUARTER ? 'unselect' : 'selected'}>Hang nam</div>
            </div>

            <div className={`financialReport ${this.state.showFinancialReport ? 'show' : 'hide'}`}>
                <div>
                    Bao cao tai chinh
                </div>
                <Tab className='tabContainer' panes={panes} onTabChange={this.handleOnTabChange.bind(this)} />
            </div>


        </div>
    }

    renderTab8() {
        return <div>8 - {Math.random()}</div>
    }

    handleShowFinancialReport() {
        this.setState({
            showFinancialReport: !this.state.showFinancialReport
        })
    }



    render() {
        const panes = [
            { menuItem: 'Giao dich', render: () => <Tab.Pane>{this.renderTab1()}</Tab.Pane> },
            { menuItem: 'Ho so', render: () => <Tab.Pane>{this.renderTab2()}</Tab.Pane> },
            { menuItem: 'Co dong', render: () => <Tab.Pane>{this.renderTab3()}</Tab.Pane> },
            { menuItem: 'Von va co tuc', render: () => <Tab.Pane>{this.renderTab4()}</Tab.Pane> },
            { menuItem: 'Tin tuc', render: () => <Tab.Pane>{this.renderTab5()}</Tab.Pane> },
            { menuItem: 'Gia qua khu', render: () => <Tab.Pane>{this.renderTab6()}</Tab.Pane> },
            { menuItem: 'Tai chinh', render: () => <Tab.Pane>{this.renderTab7()}</Tab.Pane> },
            { menuItem: 'Ky thuat', render: () => <Tab.Pane>{this.renderTab8()}</Tab.Pane> },
        ]
        return (
            <div className='detailSymbol'>
                <SearchSymbol dataReceivedFromSearchSymbol={this.dataReceivedFromSearchSymbol.bind(this)} />
                <Tab defaultActiveIndex='6' className='tabContainer' panes={panes} onTabChange={this.handleOnTabChange.bind(this)} />
                <div onClick={() => this.props.close()}>Close</div>

            </div>
        );
    }

    componentDidMount() {
    }
}

function mapStateToProps(state) {
    return {
        symbol: state.symbol.symbol
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(symbolActions, dispatch)
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(DetailSymbol);
export default DetailSymbol
