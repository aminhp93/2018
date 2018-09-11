import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const options = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
]

export default class CustomedDropdown extends React.Component {

    render() {
        return (
            <Dropdown placeholder='State' search selection options={options} />
        );
    }
}