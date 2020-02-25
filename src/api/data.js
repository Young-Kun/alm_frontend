/**
 * data模块接口
 */

const data = {
    // 获取所有量化表信息
    datatList(params) {
        return window.axios.get('/data/', {params});
    },
    // 下载某个表格
    downloadData(path) {
        return window.location.href = path;
    },
    // 修改某个表格
    updateData(file_name, file) {
        return window.axios.put(`/data/${file_name}/`, file)
    },
    // 新建
    uploadData(data) {
        return window.axios.post('/data/', data)
    }
};

export default data
