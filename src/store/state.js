import cookie from '@/store/cookie';

const siderMenuList = [
    // 上级菜单的name要等于子菜单的前缀，最多只能有2级菜单
    {
        id: 1,
        name: 'data',
        icon: 'fa-database',
        span: '数据管理',
        menu_items: [
            {id: 1, name: 'data-upload', icon: '', span: '上传数据', to: {name: 'data-upload'}},
            {id: 2, name: 'data-review', icon: '', span: '数据查看', to: {name: 'data-review'}},
        ]
    },
    {
        id: 2,
        name: 'result',
        icon: 'fa-bar-chart',
        span: '量化结果',
        menu_items: [
            {id: 1, name: 'result-score', icon: '', span: '得分情况', to: {name: 'result-score'}},
            {id: 2, name: 'result-indicator', icon: '', span: '关键指标', to: {name: 'result-indicator'}},
        ]
    },
    {
        id: 3,
        name: 'internal-data',
        icon: 'fa-file-powerpoint-o',
        span: '内部报告'
    },
];

const user = {
    username: cookie.getCookie('username') || '',
    token: cookie.getCookie('token') || ''
};

export default {
    siderMenuList,
    user,
}
