import React from 'react';
import { Tab } from 'semantic-ui-react';
import Transaction from '../../Transaction';
import Profile from '../../Profile';
import Shareholder from '../../Shareholder';
import CapitalAndDividend from '../../CapitalAndDividend';
import News from '../../News';
import Price from '../../Price';
import Financials from '../../Financials';
import TechnicalAnalysis from '../../TechnicalAnalysis';
import CustomedTable from '../CustomedTable';
export default class CustomedTabPane extends React.Component {

    render() {
        switch (this.props.title) {
            case 'Transaction':
                return <Tab.Pane><Transaction /></Tab.Pane>
            case 'Profile':
                return <Tab.Pane><Profile /></Tab.Pane>
            case 'Shareholders':
                return <Tab.Pane><Shareholder /></Tab.Pane>
            case 'Capital and Dividend':
                return <Tab.Pane><CapitalAndDividend /></Tab.Pane>
            case 'News':
                return <Tab.Pane><News /></Tab.Pane>
            case 'Price':
                return <Tab.Pane><Price /></Tab.Pane>
            case 'Financials':
                return <Tab.Pane><Financials /></Tab.Pane>
            case 'Technical Analysis':
                return <Tab.Pane><TechnicalAnalysis /></Tab.Pane>
            case 'AllShareholders':
                return <Tab.Pane><CustomedTable data={this.props.data} /></Tab.Pane>
            case 'Individuals':
                return <Tab.Pane><CustomedTable /></Tab.Pane>
            case 'Organizations':
                return <Tab.Pane><CustomedTable /></Tab.Pane>
            default:
                return <div>Test</div>
        }
    }
}