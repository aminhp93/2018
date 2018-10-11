import React from 'react';
import Menu from '../Menu';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className='header'>
                <Menu addComponentToStack={this.props.addComponentToStack} />
            </div>
        );
    }
}