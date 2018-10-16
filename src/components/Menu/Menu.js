import React from 'react';
import dataStorage from '../../dataStorage';

export default class Menu extends React.Component {

    handleOnClick(e) {
        this.props.addComponentToStack(e.target.innerText);
    }

    handleChangeWorkMode() {
        dataStorage.goldenLayout.initGoldenLayout('work')
    }

    handleChangeLifeMode() {
        dataStorage.goldenLayout.initGoldenLayout('life')
    }

    render() {
        return (
            <div className='menu'>
                <div onClick={this.handleOnClick.bind(this)}>
                    App
                </div>
                <div onClick={this.handleOnClick.bind(this)}>
                    Book
                </div>
                <div onClick={this.handleOnClick.bind(this)}>
                    DetailSymbol
                </div>
                <div onClick={this.handleOnClick.bind(this)}>
                    DailyWatchlist
                </div>
                <div onClick={this.handleOnClick.bind(this)}>
                    AccountManagement
                </div>
                <div onClick={this.handleOnClick.bind(this)}>
                    FilterSystem
                </div>
                <div onClick={this.handleOnClick.bind(this)}>
                    CurrentPrice
                </div>
                <div onClick={this.handleOnClick.bind(this)}>
                    NewOrder
                </div>
                <div onClick={this.handleOnClick.bind(this)}>
                    ChartTV
                </div>
                <div onClick={this.handleOnClick.bind(this)}>
                    Financials
                </div>
                <div onClick={this.handleOnClick.bind(this)}>
                    PersonalStuffs
                </div>
                <div onClick={this.handleOnClick.bind(this)}>
                    MovieActorSpeech
                </div>
                <div onClick={this.handleOnClick.bind(this)}>
                    MarketWatch
                </div>
                <div onClick={this.handleChangeWorkMode.bind(this)}>
                    Work
                </div>
                <div onClick={this.handleChangeLifeMode.bind(this)}>
                    Life
                </div>
            </div>
        );
    }
}
