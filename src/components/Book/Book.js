import React from 'react';
import axios from 'axios';
import { getAllIndustryFinancialInfoUrl } from '../../helpers/requests'
import dataStorage from '../../dataStorage';

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.allSymbolArray = dataStorage.allSymbolsString
        this.state = {
            currentList: this.allSymbolArray || []
        }
    }

    render() {
        return (
            <div>
                <div>
                    <a href='https://drive.google.com/file/d/1ZD9_t6wDlUUCXH8IWBcvnB3NLWNakZqO/view?usp=sharing' target="_blank" rel="noopener noreferrer" >Phan tich ky thuat A-Z</a>
                </div>
                <div>
                    <a href='https://web.kamihq.com/web/viewer.html?state=%7B%22ids%22%3A%5B%2214tVrJg45upCtkHg13QuTXkMiDtO3VO0I%22%5D%2C%22action%22%3A%22open%22%2C%22userId%22%3A%22117857483954615844010%22%7D&filename=Elder%20Alexander%20-%20Trading%20For%20A%20Living.pdf' target="_blank" rel="noopener noreferrer" >Trading For A Living</a>
                </div>
                <div>
                    <a href='https://web.kamihq.com/web/viewer.html?state=%7B%22ids%22%3A%5B%221pNI_LbsxN-L1BVCvnrhVg94-Ww3etUtP%22%5D%2C%22action%22%3A%22open%22%2C%22userId%22%3A%22117857483954615844010%22%7D&filename=PHAN%20TICH%20BAO%20CAO%20TAI%20CHINH_HUONG%20DAN%20THUC%20HANH%20(MARTIN%20FRIDSON%20-%20FERNANDO%20ALVAREZ).pdf' target="_blank" rel="noopener noreferrer" >Phan tich bao cao tai chinh</a>
                </div>
                <div>
                    git log --before="7 month ago" --pretty=format:"%h%x09%an%x09%ad%x09%s"
                </div>
                <div onClick={this.handleInsertData.bind(this)}>
                    Insert Data: {this.state.currentList.length} - {this.state.currentList}
                </div>
            </div>

        )
    }

    handleInsertData() {
        let i = 0
        const intervalId = setInterval(() => {
            let url1 = ''
            let url2 = ''
            let symbol = this.state.currentList[i]
            console.log(symbol)
            url1 = 'http://localhost:8000/historical-quote/insert/' + symbol
            url2 = 'https://project-2018-backend.herokuapp.com/historical-quote/insert/' + symbol
            axios.get(url1)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
            axios.get(url2)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
            if (i === this.state.currentList.length) clearInterval(intervalId)
            i++
        }, 5000)
    }

    componentDidMount() {
    }
}

export default Book
