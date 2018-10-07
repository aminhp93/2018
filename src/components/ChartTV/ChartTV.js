import React from 'react';
import { translate, Trans } from 'react-i18next';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as symbolActions from '../../actions/symbol.actions';
import Datafeeds from './datafeeds';


class ChartTv extends React.Component {
    componentDidMount() {
        console.warn('componentDidMount');
        /* global TradingView */
        // TradingView.onready(function () {
        console.warn('onReady');
        let data = null;
        // data = new Datafeeds.UDFCompatibleDatafeed('https://demo_feed.tradingview.com');
        data = new Datafeeds.UDFCompatibleDatafeed();
        const option = {
            fullscreen: true,
            symbol: 'AAPL',
            interval: 'D',
            container_id: 'tv_chart_container',
            //	BEWARE: no trailing slash is expected in feed URL
            datafeed: data,
            library_path: 'charting_library/',
            locale: 'en',
            //	Regression Trend-related functionality is not implemented yet, so it's hidden for a while
            drawings_access: { type: 'black', tools: [{ name: 'Regression Trend' }] },
            enabled_features: ['chart_property_page_trading'],
            // charts_storage_url: 'http://saveload.tradingview.com',
            charts_storage_api_version: '1.1',
            client_id: 'abc.com',
            footer_screenshot: false,
            disabled_features: ['use_localstorage_for_settings', 'study_templates', 'dome_widget', 'header_layouttoggle', 'header_screenshot', 'move_logo_to_main_pane', 'snapshot_trading_drawings', 'show_logo_on_all_charts'],
            user_id: 'public_user_id'
        };
        const TV = TradingView.widget;
        const abc = new TV(option);
        // });
    }

    render() {
        return <article id='tv_chart_container' />;
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

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(ChartTv));