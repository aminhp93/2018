
const getDefaultLayout = (percentHeightTop = 40, percentWidth = 20) => {
    return [
        {
            'type': 'row',
            'content': [
                // {
                //     'type': 'component',
                //     'component': 'DailyWatchlist',
                //     'componentName': 'lm-react-component',
                //     'isClosable': true,
                //     'reorderEnabled': true,
                //     'title': 'DailyWatchlist'
                // },
                // {
                //     'type': 'component',
                //     'component': 'DetailSymbol',
                //     'componentName': 'lm-react-component',
                //     'isClosable': true,
                //     'reorderEnabled': true,
                //     'title': 'DetailSymbol'
                // },
                // {
                //     'type': 'component',
                //     'component': 'App',
                //     'componentName': 'lm-react-component',
                //     'isClosable': true,
                //     'reorderEnabled': true,
                //     'title': 'App'
                // },
                // {
                //     'type': 'component',
                //     'component': 'Book',
                //     'componentName': 'lm-react-component',
                //     'isClosable': true,
                //     'reorderEnabled': true,
                //     'title': 'Book'
                // },
                // {
                //     'type': 'component',
                //     'component': 'Tennis',
                //     'componentName': 'lm-react-component',
                //     'isClosable': true,
                //     'reorderEnabled': true,
                //     'title': 'Tennis'
                // },
                // {
                //     'type': 'component',
                //     'component': 'AccountManagement',
                //     'componentName': 'lm-react-component',
                //     'isClosable': true,
                //     'reorderEnabled': true,
                //     'title': 'AccountManagement'
                // },
                {
                    'type': 'component',
                    'component': 'FilterSystem',
                    'componentName': 'lm-react-component',
                    'isClosable': true,
                    'reorderEnabled': true,
                    'title': 'FilterSystem'
                }
            ]
        }
    ]
}

export default {
    getDefaultLayout
}
