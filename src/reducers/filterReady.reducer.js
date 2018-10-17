export const filterReady = (state = {}, action) => {
    switch (action.type) {
        case 'CHECK_FILTER_READY':
            return {
                ...state,
                filterReady: true
            }
        default:
            return state
    }
}
