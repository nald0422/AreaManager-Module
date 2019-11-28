export function mutate_set_user (state, payload) {
    state.user_data = payload
    console.log("User updated : " + JSON.stringify(state.user_data))
}

export function mutate_remove_user (state) {
    state.user_data = []
}

