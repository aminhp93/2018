import dataStorage from '../dataStorage';
var moment = require('moment');

const accountNumber = dataStorage.accountNumber;
const currentTime = moment()
const todayDate = moment().format('YYYY-M-DD')

export function getHeaderRequest() {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'X-Auth-Token': dataStorage.accessToken
        }
    }
}

export function getCompanyInfoUrl(symbol) {
    return 'https://www.fireant.vn/api/Data/Companies/CompanyInfo?symbol=' + symbol
}

export function getLatestFinancialInfoUrl(symbol) {
    return 'https://cors-anywhere.herokuapp.com/https://www.fireant.vn/api/Data/Finance/LastestFinancialInfo?symbol=' + symbol
}

export function getAllIndustryFinancialInfoUrl() {
    return 'https://www.fireant.vn/api/Data/Finance/AllIndustryFinancialInfo'
}

export function getAlertsUrl() {
    return 'https://www.fireant.vn/api/Data/Alerts/Alerts'
}

export function getIntradayQuotesUrl(symbol) {
    return 'https://svr2.fireant.vn/api/Data/Markets/IntradayQuotes?symbol=' + symbol
    // return 'https://cors-anywhere.herokuapp.com/https://svr2.fireant.vn/api/Data/Markets/IntradayQuotes?symbol=' + symbol
}

export function getMarketHistoricalQuotesUrl(symbol) {
    return 'https://svr1.fireant.vn/api/Data/Markets/HistoricalQuotes?symbol=' + symbol + '&startDate=2017-10-8&endDate=' + todayDate
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

export function getCompanyNewsUrl(symbol) {
    return 'https://www.fireant.vn/api/Data/News/CompanyNews?symbol=' + symbol + '&startIndex=0&count=10'
    // return 'https://cors-anywhere.herokuapp.com/https://www.fireant.vn/api/Data/News/CompanyNews?symbol=' + symbol + '&startIndex=0&count=10'
}

export function getCompanyNewsCountUrl(symbol) {
    return 'https://www.fireant.vn/api/Data/News/CompanyNewsCount?symbol=' + symbol
}

export function getCompanyHistoricalQuotesUrl(symbol) {
    return 'https://www.fireant.vn/api/Data/Companies/HistoricalQuotes?symbol=' + symbol + '&startDate=2017-10-8&endDate=2018-10-3'
    // return 'https://cors-anywhere.herokuapp.com/https://www.fireant.vn/api/Data/Companies/HistoricalQuotes?symbol=' + symbol + '&startDate=2018-8-19&endDate=2018-9-19'
}

export function getYearlyFinancialInfoUrl(symbol) {
    return 'https://www.fireant.vn/api/Data/Finance/YearlyFinancialInfo?symbol=' + symbol + '&fromYear=2015&toYear=2018'
}

export function getQuarterlyFinancialInfoUrl(symbol) {
    return 'https://www.fireant.vn/api/Data/Finance/QuarterlyFinancialInfo?symbol=' + symbol + '&fromYear=2015&fromQuarter=1&toYear=2018&toQuarter=4'
}

export function getHistoricalQuotesBeforeUrl(symbol) {
    return 'https://www.fireant.vn/api/Data/Markets/HistoricalQuotesBefore?symbol=' + symbol + '&days=20'
}

export function getPivotPointsUrl() {
    return 'https://www.fireant.vn/api/Data/Technical/PivotPoints'
}

export function getTechnicalIndicatorsUrl() {
    return 'https://www.fireant.vn/api/Data/Technical/TechnicalIndicators'
}

export function getMovingAveragesUrl() {
    return 'https://www.fireant.vn/api/Data/Technical/MovingAverages'
}

export function getTradingStatisticUrl() {
    // return 'https://cors-anywhere.herokuapp.com/https://svr2.fireant.vn/api/Data/Markets/TradingStatistic'
    return 'https://svr2.fireant.vn/api/Data/Markets/TradingStatistic'
}

export function getAccountUrl() {
    return 'https://trade-api.vndirect.com.vn/accounts/' + accountNumber
}

export function getAccountAssetsUrl() {
    return 'https://trade-api.vndirect.com.vn/accounts/v2/' + accountNumber + '/assets'
}

export function getAccountLoanUrl() {
    return 'https://trade-api.vndirect.com.vn/accounts/' + accountNumber + '/loan'
}

export function getAccountPortfolioUrl() {
    return 'https://trade-api.vndirect.com.vn/accounts/v3/' + accountNumber + '/portfolio'
}

export function getAccountAftypeUrl() {
    return 'https://trade-api.vndirect.com.vn/accounts/' + accountNumber + '/aftype'
}

export function getAccountStocksUrl() {
    return 'https://trade-api.vndirect.com.vn/accounts/v3/' + accountNumber + '/stocks'
}

export function getAccountCommissionsUrl() {
    return 'https://trade-api.vndirect.com.vn/accounts/' + accountNumber + '/commissions'
}

export function getNotificationsUrl() {
    return 'https://notiv2.vndirect.com.vn/notisocket/notifications?page=0&size=500'
}

export function getAccountNewOrderRequestUrl() {
    return 'https://trade-api.vndirect.com.vn/accounts/' + accountNumber + '/orders/new_order_requests?t=' + currentTime
}