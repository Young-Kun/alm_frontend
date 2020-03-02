import * as types from '@/store/mutationTypes';
import cookie from '@/utils/cookie';
import ls from '@/utils/localStorage';

export default {
    [types.SET_USER](state) {
        state.user = {
            username: cookie.getCookie('username'),
            token: cookie.getCookie('token')
        }
    },
    [types.COLLAPSE_SIDER](state) {
        state.siderStatus = 'collapsed';
        ls.set('siderStatus', 'collapsed');
    },
    [types.EXPAND_SIDER](state) {
        state.siderStatus = 'expanded';
        ls.set('siderStatus', 'expanded');
    }
}
