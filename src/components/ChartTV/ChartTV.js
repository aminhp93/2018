import React from 'react';
import { translate, Trans } from 'react-i18next';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as symbolActions from '../../actions/symbol.actions';
import Datafeeds from './datafeeds';
import axios from 'axios';
import chartTV_constants from '../../constants/chartTV_constants';
import { getSaveLayoutChartUrl, getLoadLayoutChartUrl } from '../../helpers/requests';
import FormData from 'form-data'

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
    }

    getDataChart() {
        this.initChart(chartTV_constants.defaultConfig)
    }

    initChart(dataFeed) {
        /* global TradingView */
        const that = this;
        let data = new Datafeeds.UDFCompatibleDatafeed('https://demo_feed.tradingview.com', '', dataFeed, this.callbackSearch.bind(this), this.cbSymbol.bind(this), this.chartTV);
        const option = {
            fullscreen: true,
            interval: 'D',
            container_id: this.id,
            datafeed: data,
            library_path: 'charting_library/',
            locale: 'en',
            drawings_access: { type: 'black', tools: [{ name: 'Regression Trend' }] },
            enabled_features: ['chart_property_page_trading'],
            charts_storage_api_version: '1.1',
            client_id: 'abc.com',
            footer_screenshot: false,
            disabled_features: ['use_localstorage_for_settings', 'study_templates', 'dome_widget', 'header_layouttoggle', 'header_screenshot', 'move_logo_to_main_pane', 'snapshot_trading_drawings', 'show_logo_on_all_charts'],
            user_id: 'public_user_id'
        };
        this.widget = new TradingView.widget(option);
        this.widget && this.widget.onChartReady && this.widget.onChartReady(function () {
            // createStudy(name, forceOverlay, lock, inputs, callback, overrides, options)
            // this.widget.chart().createStudy('RSI60', false, true);
            // this.widget.chart().createStudy('MACD_Minh', false, false, [14, 30, "close", 9])
            // this.widget && this.widget.chart().createStudy('OverlayMINH', false, false, ['AAPL']);
            that.loadLayoutChart()
        });
    }

    loadLayoutChart() {
        let url = getLoadLayoutChartUrl()
        axios.get(url)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    const savedLayout = JSON.parse(response.data.data.content).content
                    console.log(savedLayout)
                    this.widget && this.widget.load && this.widget.load(savedLayout)
                }
            })
            .catch(error => {
                console.log(error.response)
            });

    }

    callbackSearch(response) {
        console.log(response)
    }

    cbSymbol(response) {
        console.log(response)
    }

    componentDidMount() {
        setTimeout(() => {
            this.initChart(chartTV_constants.defaultConfig)
        }, 0)
    }

    saveLayoutChart() {
        this.widget && this.widget.save && this.widget.save(savedObj => {
            console.log(savedObj)
            let url = getSaveLayoutChartUrl()
            var formData = new FormData();
            const content = {
                "publish_request_id": uuidv4().substring(0, 12),
                "id": 33095,
                "name": "basic_layout",
                "description": "",
                "resolution": "D",
                "symbol_type": "stock",
                "exchange": "HOSE",
                "listed_exchange": "",
                "symbol": "VNM",
                "short_name": "VNM",
                "legs": "[{\"symbol\":\"VNM\",\"pro_symbol\":\"VNM\"}]",
                "content": savedObj
            }
            formData.append('name', 'basic_layout');
            formData.append('content', JSON.stringify(content));
            formData.append('symbol', 'VNM');
            formData.append('resolution', 'D');

            axios.post(url, formData)
                .then(response => {
                    if (response.data) {
                        console.log(response.data)
                    }
                })
                .catch(error => {
                    console.log(error.response)
                });
        })
    }

    render() {
        return <div>
            <article className='chartTV' id={this.id} />
            <div style={{
                position: 'absolute',
                top: 0,
                color: 'red'
            }} onClick={this.saveLayoutChart.bind(this)}>Save</div>
        </div>

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