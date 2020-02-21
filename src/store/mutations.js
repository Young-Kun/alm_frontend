import * as types from '@/store/mutationTypes';
import cookie from '@/store/cookie';

export default {
    [types.SET_USER](state) {
        state.user = {
            username: cookie.getCookie('username'),
            token: cookie.getCookie('token')
        }
    }
}
