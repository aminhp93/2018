
const getDefaultLayout = (percentHeightTop = 40, percentWidth = 20) => {
    return [
        {
            'type': 'row',
            'content': [
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
                }
            ]
        }
    ]
}

export default {
    getDefaultLayout
}
