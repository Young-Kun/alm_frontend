// 格式化日期为'YYYYmm'
export const dateFormat = (date) => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month.toString();
    return year + month;
};

// 获取两个日期之间的所有月份
export const getMonths = (startDate, endDate) => {
    if (startDate > endDate) {
        console.log('起始日期不能大于截止日期');
        return false;
    }
    let m_list = [];
    let startYear = startDate.getFullYear();
    let startMonth = startDate.getMonth();
    let d = startDate;
    while (d <= endDate) {
        m_list.push(dateFormat(d));
        d = new Date(startYear, ++startMonth, 1);
    }
    return m_list;
};
// 获取两个日期之间的所有季度月
export const getQuarters = (startDate, endDate) => {
    let q_list = [];
    let m_list = getMonths(startDate, endDate);
    m_list.forEach((value) => {
        if (parseInt(value.substring(4)) % 3 === 0){
            q_list.push(value);
        }
    });
    return q_list;
};