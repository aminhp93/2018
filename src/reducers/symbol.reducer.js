export const symbol = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_SYMBOL':
            return {
                ...state,
                symbol: action.symbol
            }
        default:
            return state
    }
}
