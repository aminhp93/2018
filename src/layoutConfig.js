
const getDefaultLayout = (percentHeightTop = 40, percentWidth = 20) => {
    return [
        {
            'type': 'row',
            'content': [
                {
                    'type': 'component',
                    'component': 'DailyWatchlist',
                    'componentName': 'lm-react-component',
                    'isClosable': true,
                    'reorderEnabled': true,
                    'title': 'DailyWatchlist'
                },
                {
                    'type': 'component',
                    'component': 'DetailSymbol',
                    'componentName': 'lm-react-component',
                    'isClosable': true,
                    'reorderEnabled': true,
                    'title': 'DetailSymbol'
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
                },
                {
                    'type': 'component',
                    'component': 'Tennis',
                    'componentName': 'lm-react-component',
                    'isClosable': true,
                    'reorderEnabled': true,
                    'title': 'Tennis'
                }
            ]
        }
    ]
}

export default {
    getDefaultLayout
}
