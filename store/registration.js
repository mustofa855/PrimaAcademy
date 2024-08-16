export const state = () => ({
  // store data
  hashName: null,
  id: null,
  name: null,
  schoolName: null,
})

export const mutations = {
  SetRegistration(state, payload) {
    state.hashName = payload.hash_name
    state.id = payload.id
    state.name = payload.name
    state.schoolName = payload.school_name
  },
}
