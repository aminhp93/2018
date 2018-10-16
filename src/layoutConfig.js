
const getDefaultWorkLayout = (percentHeightTop = 40, percentWidth = 20) => {
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
                    'title': 'DailyWatchlist',
                    'width': 10
                },
                {
                    'type': 'component',
                    'component': 'ChartTV',
                    'componentName': 'lm-react-component',
                    'isClosable': true,
                    'reorderEnabled': true,
                    'title': 'ChartTV',
                    'width': 90
                }
            ]
        }
    ]
}

const getDefaultLifeLayout = (percentHeightTop = 40, percentWidth = 20) => {
    return [

        {
            'type': 'row',
            'content': [
                {
                    'type': 'column',
                    'height': 50,
                    'content': [
                        {
                            'type': 'component',
                            'component': 'Tennis',
                            'componentName': 'lm-react-component',
                            'isClosable': true,
                            'reorderEnabled': true,
                            'title': 'Tennis',
                            'width': 50
                        },
                        {
                            'type': 'component',
                            'component': 'Book',
                            'componentName': 'lm-react-component',
                            'isClosable': true,
                            'reorderEnabled': true,
                            'title': 'Book',
                            'width': 50
                        },
                    ]
                },
                {
                    'type': 'column',
                    'height': 50,
                    'content': [
                        {
                            'type': 'component',
                            'component': 'MovieActorSpeech',
                            'componentName': 'lm-react-component',
                            'isClosable': true,
                            'reorderEnabled': true,
                            'title': 'MovieActorSpeech'
                        }
                    ]
                }
            ]

        }
    ]
}

export default {
    getDefaultWorkLayout,
    getDefaultLifeLayout
}
