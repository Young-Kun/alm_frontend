/**
 * user模块接口
 * logIn: (username, password) => 用户登录
 */

const user = {
    // 登录
    logIn(username, password) {
        return window.axios.post('/jwt-token-auth/', {username, password});
    }
};

export default user
