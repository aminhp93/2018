import React from 'react';
import Menu from '../Menu';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Menu addComponentToStack={this.props.addComponentToStack} />
            </div>
        );
    }
}