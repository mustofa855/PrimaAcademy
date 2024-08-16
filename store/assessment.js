// assessemnt store

// state
export const state = () => ({
  // store data
  assessmentId: null,
  assessmentName: null,
  hash_name: null,
  studentId: null,
})

export const mutations = {
  SET_ASSESSMENT(state, payload) {
    state.assessmentId = payload.id
    state.hash_name = payload.hash_name
    state.assessmentName = payload.name
  },
  SET_STUDENT(state, payload) {
    state.studentId = payload.id
  },
}
