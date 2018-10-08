import React from 'react';
import { translate, Trans } from 'react-i18next';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as symbolActions from '../../actions/symbol.actions';
import Datafeeds from './datafeeds';
import axios from 'axios';
import chartTV_constants from '../../constants/chartTV_constants';

class ChartTV extends React.Component {
    constructor(props) {
        super(props);
        this.id = uuidv4();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (!nextProps.symbol) return
        if (nextProps.symbol && nextProps.symbol.length && nextProps.symbol.length < 2) return
        this.showChart(nextProps.symbol)
    }

    showChart(code) {
        if (!this.widget || !this.widget.chart) {
            this.getDataChart()
        } else {
            const chartObj = this.widget.chart();
            chartObj.setSymbol(code, (response) => {
                console.log(response)
            })
        }
        // url = getIntradayQuotesUrl(nextProps.symbol)
        // let url = 'https://dchart-api.vndirect.com.vn/dchart/history?symbol=' + code + '&resolution=D&from=1507883566&to=1538987626'

        // axios.get(url)
        //     .then(response => {
        //         if (response.data) {
        //             console.log(response.data)
        //             this.initChart(response.data)
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error.response)
        // });
    }

    getDataChart() {
        this.initChart(chartTV_constants.defaultConfig)
    }

    initChart(dataFeed) {
        let data = new Datafeeds.UDFCompatibleDatafeed('https://demo_feed.tradingview.com', '', dataFeed, this.callbackSearch.bind(this), this.cbSymbol.bind(this), this.chartTV);
        const option = {
            fullscreen: true,
            // symbol: 'PDR',
            interval: 'D',
            container_id: this.id,
            datafeed: data,
            library_path: 'charting_library/',
            locale: 'en',
            drawings_access: { type: 'black', tools: [{ name: 'Regression Trend' }] },
            enabled_features: ['chart_property_page_trading'],
            // charts_storage_url: 'http://saveload.tradingview.com',
            charts_storage_api_version: '1.1',
            client_id: 'abc.com',
            footer_screenshot: false,
            disabled_features: ['use_localstorage_for_settings', 'study_templates', 'dome_widget', 'header_layouttoggle', 'header_screenshot', 'move_logo_to_main_pane', 'snapshot_trading_drawings', 'show_logo_on_all_charts'],
            user_id: 'public_user_id'
        };
        // if (this.chartTV) {
        this.widget = new TradingView.widget(option);
        // }
        // const that = this;
        // this.widget && this.widget.onChartReady && this.widget.onChartReady(() => {
        //     that.widget && that.widget.chart()
        // })
    }

    callbackSearch(response) {
        console.log(response)
    }

    cbSymbol(response) {
        console.log(response)
    }

    componentDidMount() {
        /* global TradingView */
        // if (!this.widget) {
        // this.initChart()
        // } else {
        //     if (this.widget && this.widget.chart()) {
        //         this.widget.chart()
        //     }
        // }
        setTimeout(() => {
            this.initChart(chartTV_constants.defaultConfig)
        }, 0)
    }

    render() {
        return <article id={this.id} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(ChartTV));