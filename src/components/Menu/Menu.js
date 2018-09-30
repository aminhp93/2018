import React from 'react';

export default class Menu extends React.Component {

    addComponentToStack(e) {
        this.props.addComponentToStack('App');
    }


    render() {
        return (
            <div>
                <div onClick={this.addComponentToStack.bind(this)}>
                    App
                </div>
            </div>
        );
    }
}
