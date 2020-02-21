import * as types from '@/store/mutationTypes';

function makeAction (type) {
  return ({ commit }, ...args) => commit(type, ...args);
}

const setUser = makeAction(types.SET_USER);

export default {
  setUser,
}
