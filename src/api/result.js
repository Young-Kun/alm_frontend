/**
 * result模块接口
 */

const result = {
    // 获取量化评估得分
    getScore(ym) {
        return window.axios.get('/result/score/', {params: {data__file_name__icontains: ym}});
    },
};

export default result
