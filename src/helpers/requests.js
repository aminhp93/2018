// import axios from 'axios';

export function getCompanyInfoUrl(symbol) {
    return 'https://www.fireant.vn/api/Data/Companies/CompanyInfo?symbol=' + symbol
}

export function getLastestFinancialInfoUrl(symbol) {
    return 'https://www.fireant.vn/api/Data/Finance/LastestFinancialInfo?symbol=' + symbol
}

export function getAllIndustryFinancialInfoUrl() {
    return 'https://www.fireant.vn/api/Data/Finance/AllIndustryFinancialInfo'
}

export function getAlertsUrl() {
    return 'https://www.fireant.vn/api/Data/Alerts/Alerts'
}