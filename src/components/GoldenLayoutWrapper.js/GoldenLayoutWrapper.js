
import React from 'react';
import ReactDOM from 'react-dom';
import GoldenLayout from 'golden-layout';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import App from '../App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import layoutConfig from '../../layoutConfig';

window.React = React;
window.ReactDOM = ReactDOM;

class GoldenLayoutWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.initGoldenLayout = this.initGoldenLayout.bind(this);
    }
    componentDidMount() {
        this.initGoldenLayout();
    }
    initGoldenLayout() {
        new Promise((resolve) => {
            let config = {
                content: []
            };
            let layout = layoutConfig.getDefaultLayout();
            const cbFunc = layout => {
                config = {
                    dimensions: {
                        headerHeight: 32,
                        borderWidth: 8,
                        minItemHeight: 192,
                        minItemWidth: 300
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

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <div className='goldenLayout' ref={input => this.layout = input} />
                    <App />
                </div>

            </MuiThemeProvider>
        );
    }
}

GoldenLayoutWrapper.contextTypes = {
    store: PropTypes.object.isRequired
};

export default GoldenLayoutWrapper
