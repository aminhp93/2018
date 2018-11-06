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
import ChartTV from '../ChartTV';

class DetailSymbol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: props.data.symbol,
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

    handleOnTabChange1(index, data) {
        console.log(data.activeIndex)
        let url1, url2, url3, promise1, promise2, promise3
        let listPromise = []
        if (data.activeIndex === 1) {
            url1 = 'https://svr2.fireant.vn/api/Data/Companies/SubCompanies?symbol=VPI'
            url2 = 'https://svr2.fireant.vn/api/Data/Companies/CompanyOfficers?symbol=VPI'
            url3 = 'https://svr2.fireant.vn/api/Data/Companies/CompanyTransactions?symbol=VPI'
            promise1 = new Promise(resolve => {
                axios.get(url1)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        resolve({})
                    })
            })
            listPromise.push(promise1)
            promise2 = new Promise(resolve => {
                axios.get(url2)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        resolve({})
                    })
            })
            listPromise.push(promise2)
            promise3 = new Promise(resolve => {
                axios.get(url3)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        resolve({})
                    })
            })
            listPromise.push(promise3)
            Promise.all(listPromise)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {

                })
        } else if (data.activeIndex === 2) {

        } else if (data.activeIndex === 3) {

        } else if (data.activeIndex === 4) {

        } else if (data.activeIndex === 5) {

        } else if (data.activeIndex === 6) {

        }
    }

    handleOnTabChange2(index, data) {
        console.log(data.activeIndex)
    }

    renderTableInfo1() {
        return <div className='tableInfo1'>
            <div className='row'>
                <div>
                    Hiện tại
                </div>
                <div>
                    Hiện tại
                </div>
            </div>
            <div className='row'>
                <div>
                    Cao/Thấp
                </div>
                <div>
                    Cao/Thấp
                </div>
            </div>
            <div className='row'>
                <div>
                    Khối lượng
                </div>
                <div>
                    Khối lượng
                </div>
            </div>
            <div className='row'>
                <div>
                    Giá trị
                </div>
                <div>
                    Giá trị
                </div>
            </div>
            <div className='row'>
                <div>
                    KLTB (10 ngày)
                </div>
                <div>
                    KLTB (10 ngày)
                </div>
            </div>
        </div>
    }

    renderTableInfo2() {
        return <div className='tableInfo2'>
            <div className='row'>
                <div>
                    Thị giá
                </div>
                <div>
                    Thị giá
                </div>
            </div>
            <div className='row'>
                <div>
                    EPS
                </div>
                <div>
                    EPS
                </div>
            </div>
            <div className='row'>
                <div>
                    P/E
                </div>
                <div>
                    P/E
                </div>
            </div>
            <div className='row'>
                <div>
                    P/S
                </div>
                <div>
                    P/S
                </div>
            </div>
            <div className='row'>
                <div>
                    P/B
                </div>
                <div>
                    P/B
                </div>
            </div>
        </div>
    }

    renderTableInfo4() {
        return <div className='tableInfo1'>
            <div className='row'>
                <div>
                    KL NN Mua
                </div>
                <div>
                    KL NN Mua
                </div>
            </div>
            <div className='row'>
                <div>
                    KL NN Bán
                </div>
                <div>
                    KL NN Bán
                </div>
            </div>
            <div className='row'>
                <div>
                    GT NN Mua
                </div>
                <div>
                    GT NN Mua
                </div>
            </div>
            <div className='row'>
                <div>
                    GT NN Bán
                </div>
                <div>
                    GT NN Bán
                </div>
            </div>
        </div>
    }

    renderTableInfo3() {
        return <div className='tableInfo1'>
            <div className='row'>
                <div>
                    Dư mua
                </div>
                <div>
                    Dư mua
                </div>
            </div>
            <div className='row'>
                <div>
                    Dư bán
                </div>
                <div>
                    Dư bán
                </div>
            </div>
            <div className='row'>
                <div>
                    KL Mua chủ động
                </div>
                <div>
                    KL Mua chủ động
                </div>
            </div>
            <div className='row'>
                <div>
                    KL Bán chủ động
                </div>
                <div>
                    KL Bán chủ động
                </div>
            </div>
        </div>
    }

    renderTab1() {
        return <div className='tab1'>
            <div className='tabColumn'>
                <div>
                    <ChartTV {...this.props} symbol='VPI' />
                </div>
                <div className='tableInfo'>
                    <div className='row'>
                        {this.renderTableInfo1()}
                        {this.renderTableInfo2()}
                    </div>
                    <div className='row'>
                        {this.renderTableInfo3()}
                        {this.renderTableInfo4()}
                    </div>
                </div>
            </div>
            <div className='tabColumn'>
                <div>
                    Dat lenh
                </div>
                <div>
                    Khop lenh
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
                <Tab className='tabContainer' panes={panes} onTabChange={this.handleOnTabChange2.bind(this)} />
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
            { menuItem: 'Giao dich', render: () => <Tab.Pane onClick={() => this.handleOnclickTab1()}>{this.renderTab1()}</Tab.Pane> },
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
                <Tab defaultActiveIndex='6' className='tabContainer' panes={panes} onTabChange={this.handleOnTabChange1.bind(this)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSymbol);
// export default DetailSymbol
