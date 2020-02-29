// 序列化Date日期为'YYYY-mm'
export const dateStr = (date) => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month.toString();
    return year + month;
};

// 反序列化日期为Date对象
export const date = (dateStr) => {
    const year = parseInt(dateStr.slice(0, 4));
    const month = parseInt(dateStr.slice(4));
    return new Date(year, month - 1, 1);
};

// 获取两个日期之间的所有月份
// 参数必须是Date对象
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
        m_list.push(dateStr(d));
        d = new Date(startYear, ++startMonth, 1);
    }
    return m_list;
};
// 获取两个日期之间的所有季度月
export const getQuarters = (startDate, endDate) => {
    let q_list = [];
    let m_list = getMonths(startDate, endDate);
    m_list.forEach((value) => {
        if (parseInt(value.substring(4)) % 3 === 0) {
            q_list.push(value);
        }
    });
    return q_list;
};

// 筛选数据
export const getObjOfAcc = (arr, key_name, key_value) => {
    return arr.filter((item) => {
        return item[key_name] === key_value;
    })
};

// 获取对象数组中某一属性的值，返回数组
export const getArray = (arr, key) => {
    let result = [];
    arr.forEach((item) => {
        result.push(item[key])
    });
    return result
};

// label数据标签格式化为亿元：数据在x轴上
export const formatBillion = (params) => {
    return (params.value[params.dimensionNames[params.encode.x[0]]] / 100000000).toFixed(0);
};

// label数据标签格式化为百分数
export const formatPercent = (params) => {
    return (params.value[params.dimensionNames[params.encode.y[0]]] * 100).toFixed(2) + '%';
};

// tooltip格式化为百分数
export const tooltipFormatPercent = (params) => {
    let str = '<div><p>' + params[0].name + '</p></div>';
    params.forEach(p => {
        str += p.marker + p.seriesName + ': ' + (p.value[p.dimensionNames[p.encode.y[0]]] * 100).toFixed(2) + '%<br/>'
    });
    return str
};

// axis label格式化为百分数
export const axisFormatPercent = (value) => {
    return (value * 100).toFixed(0) + '%'
};