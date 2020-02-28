/**
 * result模块接口
 */

const result = {
    // 获取量化评估得分
    getScore(monthStart, monthEnd) {
        return window.axios.get('/result/score/', {params: {monthStart, monthEnd}});
    },
};

export default result
