export const state = () => ({
  // store data
  id: null,
})

export const mutations = {
  SET_ID(state, payload) {
    state.id = payload
  },
}
