export function mutate_soi_comp (state, payload) {
    state.soi_comp = payload
    console.log("SOI component updated")
}

export function mutate_date_from (state, payload) {
    state.date_from = payload
}

export function mutate_date_to (state, payload) {
    state.date_to = payload
}