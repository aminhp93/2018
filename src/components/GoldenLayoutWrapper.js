
import React from 'react';
import ReactDOM from 'react-dom';
import GoldenLayout from 'golden-layout';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import App from './App';
import Note from './Note';
import Book from './Book';
import Header from './Header';
import DetailSymbol from './DetailSymbol';
import DailyWatchlist from './DailyWatchlist';
import AccountManagement from './AccountManagement';
import FilterSystem from './FilterSystem';
import Tennis from './Tennis';
import CurrentPrice from './CurrentPrice';
import NewOrder from './NewOrder';
import showModal from './Modal';
import ChartTV from './ChartTV';
import MarketWatch from './MarketWatch';
import Financials from './Financials';
import PersonalStuffs from './PersonalStuffs';
import MovieActorSpeech from './MovieActorSpeech';
import TradingViewFilter from './TradingViewFilter';
import Alpha from './Alpha';
import Chat from './Chat';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import layoutConfig from '../layoutConfig';
import axios from 'axios';
import { getTradingStatisticUrl, getMarketHistoricalQuotesUrl, getLatestFinancialInfoUrl } from '../helpers/requests';
import dataStorage from '../dataStorage';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as checkFilterReady from '../actions/checkFilterReady.actions';

window.React = React;
window.ReactDOM = ReactDOM;

class GoldenLayoutWrapper extends React.Component {
    constructor(props) {
        super(props);
        dataStorage.goldenLayout = this;
        this.goldenLayout = null;
        this.state = {

        }
        this.initGoldenLayout = this.initGoldenLayout.bind(this);
    }


    initGoldenLayout(mode) {
        new Promise((resolve) => {
            let config = {
                content: []
            };
            let layout;
            if (mode === 'work') {
                layout = layoutConfig.getDefaultWorkLayout();
            } else if (mode === 'filterSymbol') {
                layout = layoutConfig.getDefaultFilterSymbolLayout();
            } else {
                layout = layoutConfig.getDefaultLayout();
            }
            const cbFunc = layout => {
                config = {
                    dimensions: {
                        // headerHeight: 32,
                        // borderWidth: 8,
                        // minItemHeight: 192,
                        // minItemWidth: 300
                    },
                    content: layout
                }
                function wrapComponent(Component, store) {
                    class Wrapped extends React.Component {
                        ref(dom) {
                            if (dom) dom.react = this;
                        }

                        render() {
                            return (
                                <Provider store={store}>
                                    <div className={'wrapComponent'} ref={this.ref.bind(this)}>
                                        <Component {...this.props} />
                                    </div>
                                </Provider>
                            );
                        }
                    }
                    return Wrapped;
                }

                if (this.goldenLayout) this.goldenLayout.destroy();

                this.goldenLayout = new GoldenLayout(config, this.layout);
                const listComponent = [
                    ['App', App],
                    ['Book', Book],
                    ['DetailSymbol', DetailSymbol],
                    ['DailyWatchlist', DailyWatchlist],
                    ['Tennis', Tennis],
                    ['AccountManagement', AccountManagement],
                    ['FilterSystem', FilterSystem],
                    ['CurrentPrice', CurrentPrice],
                    ['NewOrder', NewOrder],
                    ['ChartTV', ChartTV],
                    ['Financials', Financials],
                    ['PersonalStuffs', PersonalStuffs],
                    ['MovieActorSpeech', MovieActorSpeech],
                    ['MarketWatch', MarketWatch],
                    ['Note', Note],
                    ['TradingViewFilter', TradingViewFilter],
                    ['Chat', Chat],
                    ['Alpha', Alpha]
                ]
                for (let i = 0; i < listComponent.length; i++) {
                    this.goldenLayout.registerComponent(listComponent[i][0],
                        wrapComponent(listComponent[i][1], this.context.store)
                    );
                }

                /// Callback for every created stack
                this.goldenLayout.on('stackCreated', (stack) => {

                });

                this.goldenLayout.on('tabCreated', (tabContainer) => {

                });

                this.goldenLayout.on('componentCreated', com => {

                })

                this.goldenLayout.init();

                this.goldenLayout.on('stateChanged', (event) => {

                });

                window.addEventListener('resize', () => {
                    this.goldenLayout.updateSize();
                });
                resolve()
            }
            cbFunc(layout)
        }).then(() => {
            //
        });
    }

    addComponentToStack(index, state = {}) {
        let title = ''
        switch (index) {
            default:
                title = index
                break;
        }
        var newItemConfig = {
            'type': 'component',
            'component': index,
            'componentName': 'lm-react-component',
            'isClosable': true,
            'reorderEnabled': true,
            'title': title,
            'componentState': state
        };
        if (index === 'DailyWatchlist') {
            newItemConfig.width = '200px'
        }
        let stack = this.goldenLayout.root.getItemsByType('stack');
        if (!stack.length) {
            this.goldenLayout.root.addChild(newItemConfig);
        } else {
            let maxH = 0;
            let maxW = 0;
            let stackParent = null;
            for (let i = 0; i < stack.length; i++) {
                const dom = stack[i].element[0];
                if (dom.clientWidth > maxW) {
                    maxW = dom.clientWidth;
                    maxH = dom.clientHeight;
                    stackParent = stack[i];
                } else if (dom.clientWidth === maxW) {
                    if (dom.clientHeight > maxH) {
                        stackParent = stack[i];
                    }
                }
            }
            stackParent.addChild(newItemConfig)
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Header addComponentToStack={this.addComponentToStack.bind(this)} />
                    <div className='goldenLayout' ref={input => this.layout = input} />
                </div>

            </MuiThemeProvider>
        );
    }

    componentDidMount() {
        this.initGoldenLayout('work');
    }
}

GoldenLayoutWrapper.contextTypes = {
    store: PropTypes.object.isRequired
};


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(checkFilterReady, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(GoldenLayoutWrapper)
