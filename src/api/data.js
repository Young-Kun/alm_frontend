/**
 * data模块接口
 */

const data = {
    // 获取所有量化表信息
    datatList() {
        return window.axios.get('/data/');
    },
    // 下载某个表格
    downloadData(path) {
        return window.location.href = path;
    },
    // 修改某个表格
    updateData(id, file) {
        return window.axios.put(`/data/${id}/`, file)
    },
    // 新建
    uploadData(data) {
        return window.axios.post('/data/', data)
    }
};

export default data
