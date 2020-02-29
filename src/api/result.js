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
    },
    // 获取会计准备金
    getReserve(monthStart, monthEnd) {
        return window.axios.get('/result/reserve/', {params: {monthStart, monthEnd}});
    },
    // 获取修正久期
    getDur(monthStart, monthEnd) {
        return window.axios.get('/result/modified-duration/', {params: {monthStart, monthEnd}});
    },
    // 获取成本收益
    getCostReturn(monthStart, monthEnd) {
        return window.axios.get('/result/cost-return/', {params: {monthStart, monthEnd}});
    },
    // 获取现金流压力测试结果
    getCashFlowTest(monthStart, monthEnd) {
        return window.axios.get('/result/cash-flow-test/', {params: {monthStart, monthEnd}});
    }
};

export default result
