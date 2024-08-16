export const state = () => ({
  // store data
  user: null,
  isAuth: false,
  role: null,
})

export const mutations = {
  SET_IS_AUTH(state, payload) {
    state.isAuth = payload
  },
  SET_ROLE(state, payload) {
    state.role = payload
  },
  SET_USER(state, payload) {
    state.user = payload
  },
}

export const actions = {
  async nuxtServerInit({ commit }, context) {
    if (context.app.$auth && context.app.$auth.$state) {
      const loggedIn = context.app.$auth.$state.loggedIn || false;
      commit('SET_IS_AUTH', loggedIn);

      if (context.app.$auth.$state.user) {
        commit('SET_USER', context.app.$auth.$state.user);
        commit('SET_ROLE', context.app.$auth.$state.role);
      }
    }
  },
}
