import React from 'react';

export default class ItemMenu extends React.Component {

    addComponentToStack(e) {
        if (e.target.value) {
            this.props.addComponentToStack(e.target.value);
        }
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