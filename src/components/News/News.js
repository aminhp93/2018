import React from 'react';
import axios from 'axios';
import { getCompanyNewsUrl, getCompanyNewsCountUrl } from '../../helpers/requests';
export default class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyNewsObj: [],
            companyNewsCountObj: null
        }
    }

    renderCompanyNews() {
        if (this.state.companyNewsObj && this.state.companyNewsObj.length > 0) {
            return this.state.companyNewsObj.map(item => {
                return <div key={item.NewsID}>
                    {item.Title}
                </div>
            })
        } else {
            return null
        }

    }

    render() {
        return (
            <div>
                News
                {this.renderCompanyNews()}
            </div>
        );
    }

    componentDidMount() {
        let url = getCompanyNewsUrl('FPT')
        axios.get(url)
            .then(response => {
                if (response.data) {
                    this.setState({
                        companyNewsObj: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
        url = getCompanyNewsCountUrl('FPT')
        axios.get(url)
            .then(response => {
                if (response.data) {
                    this.setState({
                        companyNewsCountObj: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });

    }
}