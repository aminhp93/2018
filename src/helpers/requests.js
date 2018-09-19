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

export function getIntradayQuotesUrl(symbol) {
    return 'https://svr2.fireant.vn/api/Data/Markets/IntradayQuotes?symbol=' + symbol
}

export function getMajorHolderTransactionsRangeUrl(symbol) {
    return 'https://www.fireant.vn/api/Data/Companies/MajorHolderTransactionsRange?symbol=' + symbol + '&startDate=2017-9-25&endDate=2037-1-1'
}

export function getTimescaleMarksUrl(symbol) {
    return 'https://www.fireant.vn/api/Data/Companies/TimescaleMarks?symbol=' + symbol + '&startDate=2017-9-25&endDate=2037-1-1'
}

export function getMajorHoldersUrl(symbol) {
    return 'https://www.fireant.vn/api/Data/Companies/MajorHolders?symbol=' + symbol
}

export function getEquityAndDividendsUrl(symbol) {
    return 'https://www.fireant.vn/api/Data/Companies/EquityAndDividends?symbol=' + symbol + '&count=5'
}