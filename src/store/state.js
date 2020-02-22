import cookie from '@/store/cookie';

const siderMenuList = [
    {
        id: 1,
        name: 'data',
        icon: 'ios-stats',
        span: '数据管理',
        menu_items: [
            {id: 1, name: 'favors', icon: '', span: '上传数据', to: {name: 'data-upload'}},
            {id: 2, name: 'periods', icon: '', span: '数据查看', to: {name: 'data-review'}},
        ]
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
