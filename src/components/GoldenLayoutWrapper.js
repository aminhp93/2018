
import React from 'react';
import ReactDOM from 'react-dom';
import GoldenLayout from 'golden-layout';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import App from './App';
import Book from './Book';
import Header from './Header';
import DetailSymbol from './DetailSymbol';
import DailyWatchlist from './DailyWatchlist';
import AccountManagement from './AccountManagement';
import FilterSystem from './FilterSystem';
import Tennis from './Tennis';
import CurrentPrice from './CurrentPrice';
import NewOrder from './NewOrder';
import ChartTV from './ChartTV';
import MarketWatch from './MarketWatch';
import Financials from './Financials';
import PersonalStuffs from './PersonalStuffs';
import MovieActorSpeech from './MovieActorSpeech';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import layoutConfig from '../layoutConfig';
import axios from 'axios';
import { getTradingStatisticUrl, getMarketHistoricalQuotesUrl } from '../helpers/requests';
import dataStorage from '../dataStorage';
import moment from 'moment';

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
                layout = layoutConfig.getDefaultLifeLayout();
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
                this.goldenLayout.registerComponent('App',
                    wrapComponent(App, this.context.store)
                );
                this.goldenLayout.registerComponent('Book',
                    wrapComponent(Book, this.context.store)
                );
                this.goldenLayout.registerComponent('DetailSymbol',
                    wrapComponent(DetailSymbol, this.context.store)
                );
                this.goldenLayout.registerComponent('DailyWatchlist',
                    wrapComponent(DailyWatchlist, this.context.store)
                );
                this.goldenLayout.registerComponent('Tennis',
                    wrapComponent(Tennis, this.context.store)
                );
                this.goldenLayout.registerComponent('AccountManagement',
                    wrapComponent(AccountManagement, this.context.store)
                );
                this.goldenLayout.registerComponent('FilterSystem',
                    wrapComponent(FilterSystem, this.context.store)
                );
                this.goldenLayout.registerComponent('CurrentPrice',
                    wrapComponent(CurrentPrice, this.context.store)
                );
                this.goldenLayout.registerComponent('NewOrder',
                    wrapComponent(NewOrder, this.context.store)
                );
                this.goldenLayout.registerComponent('ChartTV',
                    wrapComponent(ChartTV, this.context.store)
                );
                this.goldenLayout.registerComponent('Financials',
                    wrapComponent(Financials, this.context.store)
                );
                this.goldenLayout.registerComponent('PersonalStuffs',
                    wrapComponent(PersonalStuffs, this.context.store)
                );
                this.goldenLayout.registerComponent('MovieActorSpeech',
                    wrapComponent(MovieActorSpeech, this.context.store)
                );
                this.goldenLayout.registerComponent('MarketWatch',
                    wrapComponent(MarketWatch, this.context.store)
                );

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

    addComponentToStack(index, state = { 'test': 'test' }) {
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
                    {/* <App /> */}
                </div>

            </MuiThemeProvider>
        );
    }

    componentDidMount() {
        let url = getTradingStatisticUrl();
        let promise = null;
        let listPromise = [];
        let volume = 100000;
        let ratioVolume = 2;
        let averageNumberDay = 20;

        axios.get(url)
            .then(response => {
                if (response.data) {
                    let allSymbolsString = '';
                    let allSymbolsArray = response.data;
                    let currentSymbolObj = {}
                    for (let i = 0; i < allSymbolsArray.length; i++) {
                        currentSymbolObj = allSymbolsArray[i]
                        allSymbolsString += ',' + allSymbolsArray[i].Symbol
                        dataStorage.allSymbolsString.push(allSymbolsArray[i].Symbol)
                        if (allSymbolsArray[i].Exchange === 'HOSTC') {
                            dataStorage.allSymbolsArray_HOSE.push(allSymbolsArray[i].Symbol)
                        }
                        if (allSymbolsArray[i].Exchange === 'HASTC') {
                            dataStorage.allSymbolsArray_HNX.push(allSymbolsArray[i].Symbol)
                        }
                        if (allSymbolsArray[i].Exchange === 'UPCOM') {
                            dataStorage.allSymbolsArray_UPCOM.push(allSymbolsArray[i].Symbol)
                        }


                        promise = new Promise(resolve => {
                            url = getMarketHistoricalQuotesUrl(allSymbolsArray[i].Symbol);

                            axios.get(url).then(response => {
                                if (response && response.data) {
                                    let data = response.data;
                                    // Calculate Average Volume
                                    let average1monthVolume = 0;
                                    let sum1monthVolume = 0
                                    for (let j = 1; j < (averageNumberDay + 1); j++) {
                                        sum1monthVolume += data[data.length - 1 - j].Volume
                                    }
                                    average1monthVolume = sum1monthVolume / averageNumberDay
                                    data[data.length - 1].Average1monthVolume = average1monthVolume
                                    data[data.length - 1].RatioVolume = data[data.length - 1].Volume / average1monthVolume

                                    // Calculate RSI
                                    let sumGain = 0;
                                    let sumLoss = 0
                                    for (let j = 1; j < data.length; j++) {
                                        let change = data[j].Close - data[j - 1].Close;
                                        if (change > 0) {
                                            data[j].Gain = change
                                            data[j].Loss = 0
                                        }
                                        if (change < 0) {
                                            data[j].Loss = -change
                                            data[j].Gain = 0
                                        }
                                        if (change === 0) {
                                            data[j].Loss = 0
                                            data[j].Gain = 0
                                        }
                                        sumGain += data[j].Gain || 0
                                        sumLoss += data[j].Loss || 0
                                        if (j < 14) {
                                            data[j].AverageGain = sumGain / 14
                                            data[j].AverageLoss = sumLoss / 14
                                        } else {
                                            data[j].AverageGain = (data[j - 1].AverageGain * 13 + data[j].Gain) / 14
                                            data[j].AverageLoss = (data[j - 1].AverageLoss * 13 + data[j].Loss) / 14
                                            data[j].RSI = 100 - 100 / (1 + (data[j].AverageGain) / (data[j].AverageLoss))

                                        }
                                    }
                                    allSymbolsArray[i].RSI_14 = Number(data[data.length - 1].RSI.toFixed(0)) || 0
                                    allSymbolsArray[i].Average1monthVolume = data[data.length - 1].Average1monthVolume
                                    allSymbolsArray[i].RatioVolume = data[data.length - 1].RatioVolume

                                } else {
                                    resolve({});
                                }
                            }).catch(() => {
                                resolve({});
                            })
                        })
                        listPromise.push(promise);
                    }
                    // Promise.all(listPromise)
                    //     .then(response => {
                    dataStorage.tradingStatisticObj = allSymbolsArray
                    dataStorage.allSymbolsString = allSymbolsString
                    console.log(dataStorage)
                    this.initGoldenLayout('filterSymbol');
                    // })
                    // .catch(error => {
                    //     console.log(error.response)
                    // });

                }
            })
            .catch(error => {
                this.initGoldenLayout('filterSymbol');
                console.log(error.response)
            });
    }
}

GoldenLayoutWrapper.contextTypes = {
    store: PropTypes.object.isRequired
};

export default GoldenLayoutWrapper
