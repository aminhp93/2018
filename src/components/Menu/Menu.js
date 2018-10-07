import React from 'react';

export default class Menu extends React.Component {

    handleOnClick(e) {
        this.props.addComponentToStack(e.target.innerText);
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
            </div>
        );
    }
}
