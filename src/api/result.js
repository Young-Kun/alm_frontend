/**
 * result模块接口
 */

const result = {
    // 获取量化评估得分
    getScore(quarters) {
        return window.axios.get('/result/score/', {params: {quarters}});
    },
};

export default result
