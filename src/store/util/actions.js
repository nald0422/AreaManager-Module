export function dispatch_updateBaseUri ({commit}, payload) {
    // setTimeout(() => {
        commit('updateBaseUri', payload.uri)
    // })

    console.log("update baseuri function");
}

