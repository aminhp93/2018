export const theme = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_THEME':
            return {
                ...state,
                theme: action.theme
            }
        default:
            return state
    }
}
