export function dispatch_soi_mutation ({commit}, payload) {
    commit('mutate_soi_comp', payload.status)
}

export function dispatch_date_from ({commit}, payload) {
    commit('mutate_date_from', payload.date_from)
}

export function dispatch_date_to ({commit}, payload) {
    commit('mutate_date_to', payload.date_to)
}
