export const state = () => ({
  id: null,
  name: null,
})

export const mutations = {
  SET_ID(state, payload) {
    state.id = payload
  },
  SET_NAME(state, payload) {
    state.name = payload
  },
}
