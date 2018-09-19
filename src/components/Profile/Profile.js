import React from 'react';
import axios from 'axios';
import { getCompanyInfoUrl } from '../../helpers/requests';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyInfoObj: {}
        }
    }

    render() {
        return (
            <div className='profile'>
                <div>
                    Gioi thieu
                </div>
                <div>
                    {this.state.companyInfoObj.Overview}
                </div>
                <div className='companyInfo'>
                    <div>
                        <div className='row'>
                            Thong tin co ban
                        </div>
                        <div className='row'>
                            <div>
                                Mã SIC
                            </div>
                            <div>
                                {this.state.companyInfoObj.Symbol}
                            </div>
                        </div>
                        <div className='row'>
                            <div>
                                Mã ngành ICB
                            </div>
                            <div>
                                {this.state.companyInfoObj.ICBCode}
                            </div>
                        </div>
                        <div className='row'>
                            <div>
                                Năm thành lập
                            </div>
                            <div>
                                {this.state.companyInfoObj.EstablishmentDate}
                            </div>
                        </div>
                        <div className='row'>
                            <div>
                                Vốn điều lệ
                            </div>
                            <div>
                                {this.state.companyInfoObj.ListingVolume}
                            </div>
                        </div>
                        <div className='row'>
                            <div>
                                Số lượng nhân sự
                            </div>
                            <div>
                                {this.state.companyInfoObj.Employees}
                            </div>
                        </div>
                        <div className='row'>
                            <div>
                                Số lượng chi nhánh
                            </div>
                            <div>
                                {this.state.companyInfoObj.Branches}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='row'>
                            Thong tin niem yet
                        </div>
                        <div className='row'>
                            <div>
                                Ngày niêm yết
                            </div>
                            <div>
                                {this.state.companyInfoObj.DateOfListing}
                            </div>
                        </div>
                        <div className='row'>
                            <div>
                                Nơi niêm yết
                            </div>
                            <div>
                                {this.state.companyInfoObj.Exchange}
                            </div>
                        </div>
                        <div className='row'>
                            <div>
                                Giá chào sàn
                            </div>
                            <div>
                                {this.state.companyInfoObj.InitialListingPrice}
                            </div>
                        </div>
                        <div className='row'>
                            <div>
                                Ngày phát hành cuối
                            </div>
                            <div>
                                {this.state.companyInfoObj.DateOfIssue}
                            </div>
                        </div>
                        <div className='row'>
                            <div>
                                KL đang niêm yết
                            <div>
                                    {this.state.companyInfoObj.CharterCapital}
                                </div>
                            </div>
                            <div className='row'>
                                <div>
                                    GT niêm yết
                            </div>
                                <div>
                                    {this.state.companyInfoObj.CharterCapital * 44.8}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    componentDidMount() {
        let url = getCompanyInfoUrl('FPT')
        axios.get(url)
            .then(response => {
                if (response.data) {
                    this.setState({
                        companyInfoObj: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }
}