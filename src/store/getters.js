const siderMenuList = (state) => {
    return state.siderMenuList
};

const username = (state) => {
    return state.user.username;
};

const siderStatus = (state) => {
    return state.siderStatus;
};

export default {
    siderStatus,
    siderMenuList,
    username,
}
