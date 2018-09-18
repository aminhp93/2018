import React from 'react';
import { Tab } from 'semantic-ui-react';

export default class CustomedTabPane extends React.Component {

    render() {
        switch (this.props.title) {
            case 'Transaction':
                return <Tab.Pane>Tab 3 Content</Tab.Pane>
            case 'Profile':
                return <Tab.Pane>Tab 3 Content</Tab.Pane>
            case 'Shareholders':
                return <Tab.Pane>Tab 3 Content</Tab.Pane>
            case 'Capital and Dividend':
                return <Tab.Pane>Tab 3 Content</Tab.Pane>
            case 'News':
                return <Tab.Pane>Tab 3 Content</Tab.Pane>
            case 'Price':
                return <Tab.Pane>Tab 3 Content</Tab.Pane>
            case 'Financials':
                return <Tab.Pane>Tab 3 Content</Tab.Pane>
            case 'Technical Analysis':
                return <Tab.Pane>Tab 3 Content</Tab.Pane>
            default:
                return <div>Test</div>
        }
    }
}