import cookie from '@/store/cookie';

const user = {
    username: cookie.getCookie('username') || '',
    token: cookie.getCookie('token') || ''
};

export default {
    user
}
