import * as types from '@/store/mutationTypes';

function makeAction (type) {
  return ({ commit }, ...args) => commit(type, ...args);
}

const setUser = makeAction(types.SET_USER);
const collapseSider = makeAction(types.COLLAPSE_SIDER);
const expandSider = makeAction(types.EXPAND_SIDER);

export default {
  setUser,
  collapseSider,
  expandSider,
}
