import React from 'react';
import { translate, Trans } from 'react-i18next';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as symbolActions from '../../actions/symbol.actions';
import Datafeeds from './datafeeds';

class ChartTV extends React.Component {
    constructor(props) {
        super(props);
        this.id = uuidv4();
    }

    initChart() {
        let data = null;
        data = new Datafeeds.UDFCompatibleDatafeed('https://demo_feed.tradingview.com', this.chartTV);
        const option = {
            fullscreen: true,
            symbol: 'AAPL',
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
        if (this.chartTV) {
            this.widget = new TradingView.widget(option);
        }
        // const that = this;
        // this.widget && this.widget.onChartReady && this.widget.onChartReady(() => {
        //     that.widget && that.widget.chart()
        // })
    }

    componentDidMount() {
        /* global TradingView */
        // if (!this.widget) {
        this.initChart()
        // } else {
        //     if (this.widget && this.widget.chart()) {
        //         this.widget.chart()
        //     }
        // }
    }

    render() {
        return <article id={this.id} ref={dom => this.chartTV = dom} />;
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