export default {
    listTimeFilter: ['1w', '1m', '3m', '6m', '1y', '3y'],
    defaultConfig: {
        // timeScaleMax: [{ 'id': 'tsm1', 'time': 1517788800, 'color': 'red', 'label': 'A', 'tooltip': '' }, { 'id': 'tsm2', 'time': 1517443200, 'color': 'blue', 'label': 'D', 'tooltip': ['Dividends: $0.56', 'Date: Thu Feb 01 2018'] }, { 'id': 'tsm3', 'time': 1517184000, 'color': 'green', 'label': 'D', 'tooltip': ['Dividends: $3.46', 'Date: Mon Jan 29 2018'] }, { 'id': 'tsm4', 'time': 1516492800, 'color': '#999999', 'label': 'E', 'tooltip': ['Earnings: $3.44', 'Estimate: $3.60'] }, { 'id': 'tsm7', 'time': 1515196800, 'color': 'red', 'label': 'E', 'tooltip': ['Earnings: $5.40', 'Estimate: $5.00'] }],
        // lmarkData: '{'id':[0,1,2,3,4,5],'time':[1517788800,1517443200,1517184000,1517184000,1516492800,1515196800],'color':['red','blue','green','red','blue','green'],'text':['Today','4 days back','7 days back + Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','7 days back once again','15 days back','30 days back'],'label':['A','B','CORE','D','EURO','F'],'labelFontColor':['white','white','red','#FFFFFF','white','#000'],'minSize':[14,28,7,40,7,14]}',
        groupRequest: '',
        init: {
            'theme': 'Dark',
            'supports_search': true,
            'supports_group_request': false,
            'supports_marks': true,
            'supports_timescale_marks': true,
            'supports_time': true,
            'exchanges': [
                {
                    'value': '',
                    'name': 'All Exchanges',
                    'desc': ''
                },
                {
                    'value': 'ASX',
                    'name': 'ASX',
                    'desc': 'ASX'
                }
            ],
            'symbols_types': [
                {
                    'name': 'All types',
                    'value': ''
                },
                {
                    'name': 'Stock',
                    'value': 'stock'
                },
                {
                    'name': 'Index',
                    'value': 'index'
                }
            ],
            'supported_resolutions': [
                '1',
                '5',
                '30',
                '60',
                '120',
                'D'
            ]
        }
    }
}
