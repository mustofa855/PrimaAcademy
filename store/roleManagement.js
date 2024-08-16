export const state = () => ({
  roles: null,
  role: null,
  roleName: null,
})

export const mutations = {
  setRole(state, payload) {
    state.roles = payload
  },
  changeRole(state, payload) {
    state.role = payload.id
    state.roleName = payload.name
  }
}
