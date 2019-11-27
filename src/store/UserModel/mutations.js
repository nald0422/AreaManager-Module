export function mutate_user (state, payload) {
    state.user_data = payload
    console.log("User updated : " + JSON.stringify(state.user_data))
}

