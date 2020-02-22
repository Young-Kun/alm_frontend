/**
 * report模块接口
 * logIn: (username, password) => 用户登录
 */

const report = {
    // 获取所有量化表信息
    reportList() {
        return window.axios.get('/reports/');
    }
};

export default report
