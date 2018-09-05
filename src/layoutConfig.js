
const getDefaultLayout = (percentHeightTop = 40, percentWidth = 20) => {
    return [
        {
            'type': 'row',
            'content': [
                {
                    'type': 'component',
                    'component': 'App',
                    'componentName': 'lm-react-component',
                    'isClosable': true,
                    'reorderEnabled': true,
                    'title': 'App'
                }
            ]
        }
    ]
}

export default {
    getDefaultLayout
}
