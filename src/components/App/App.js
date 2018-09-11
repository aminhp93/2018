import React from 'react';
import Book from '../Book';
import { I18n } from 'react-i18next';
import CustomedDropdown from '../Ultilities/CustomedDropdown';

class App extends React.Component {
    render() {
        return (
            <div>
                <I18n>
                    {
                        (t, { i18n }) => (
                            <div>
                                <h1>{t('test')}</h1>
                                <button
                                    onClick={() => { i18n.changeLanguage('vi'); }}>{t('vi')}
                                </button>
                                <button
                                    onClick={() => { i18n.changeLanguage('en'); }}>{t('en')}
                                </button>
                                <a
                                    href='https://github.com/i18next/react-i18next'
                                    target='_blank'
                                    rel="noopener noreferrer"
                                >
                                    {t('nav:link1')}
                                </a>
                            </div>
                        )
                    }
                </I18n>

                <a href='https://vndirectcareers.com/viec-lam/thuc-tap-sinh-ngan-hang-dau-tu.35a65311.html'>Thuc tap sinh ngan hang dau tu</a>/>
                <div>
                    Ngành nghề: Chứng khoán, Kế toán / Kiểm toán, Ngân hàng, Tài chính / Đầu tư
                </div>
                <div>
                    Hạn Chót Nhận Hồ Sơ: 26/09/2018
                </div>
                <div>
                    Mo ta cong viec
                    <div>
                        Thực hiện các phân tích tài chính sử dụng nhiều phương pháp định giá khác nhau bao gồm: phương pháp chiết khấu dòng tiền, đòn bẩy tài chính, phương pháp so sánh với giá trị thị trường và so sánh với các giao dịch trước đó.
                    </div>
                    <div>
                        Xây dựng mô hình tài chính chi tiết để đánh giá hiệu quả hoạt động của công ty theo các kịch bản khác nhau, đồng thời phân tích tác động của các cơ cấu vốn khác nhau lên giá trị doanh nghiệp và các giao dịch mua bán& sát nhập (M&A) tiềm năng.
                    </div>
                    <div>
                        Chuẩn bị tài liệu trình bày trong các buổi họp với khách hàng, bao gồm các chiến lược đầu tư, hoạt động thị trường vốn và tổng quan tài chính doanh nghiệp
                    </div>
                    <div>
                        Tham gia vào tất cả các giai đoạn trong một giao dịch tài chính, từ giai đoạn ban đầu là tìm kiếm khách hàng tới kết thúc giao dịch.
                    </div>
                    <div>
                        Chuẩn bị các hồ sơ niêm yết, đăng ký giao dịch, đăng ký lưu ký, đăng ký phát hành, thoái vốn, tổ chức ĐHĐCĐ và các công việc khác liên quan đến UBCKNN, Sở giao dịch Chứng khoán Hà Nội/Thành phố Hồ Chí Minh và Trung tâm Lưu ký Chứng khoán
                    </div>
                </div>

                <Book />

                <div>Helloworld1</div>
                <CustomedDropdown />
            </div>
        )
    }
}

export default App
