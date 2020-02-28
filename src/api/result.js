/**
 * result模块接口
 */

const result = {
    // 获取量化评估得分
    getScore(monthStart, monthEnd) {
        return window.axios.get('/result/score/', {params: {monthStart, monthEnd}});
    },
    // 获取资产大类
    getAssets(monthStart, monthEnd) {
        return window.axios.get('/result/assets/', {params: {monthStart, monthEnd}});
    }
};

export default result
