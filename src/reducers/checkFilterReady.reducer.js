export const checkFilterReady = (state = {}, action) => {
    switch (action.type) {
        case 'CHECK_FILTER_READY':
            return {
                ...state,
                checkFilterReady: true
            }
        default:
            return state
    }
}
