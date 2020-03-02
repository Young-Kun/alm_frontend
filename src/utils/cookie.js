/**
 * cookie操作
 * setCookie: (name, value, expireDays) => 创建一个cookie
 * getCookie: name => value，获取键为name的cookie值
 * delCookie: name => 删除一个名字为name的cookie
 */

const cookie = {
    setCookie(name, value, expireDays) {
        const expireDatetime = new Date();
        expireDatetime.setTime(expireDatetime.getTime() + expireDays);
        expireDatetime.setDate(expireDatetime.getDate() + expireDays);
        document.cookie = name + '=' + escape(value) + ((expireDays == null) ? '' : ';expires=' + expireDatetime.toUTCString())
    },
    getCookie(name) {
        const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
        const arr = document.cookie.match(reg);
        if (arr) {
            return (arr[2])
        } else {
            return null
        }
    },
    delCookie(name) {
        const value = cookie.getCookie(name);
        if (value != null) {
            cookie.setCookie(name, '', -1)
        }
    }
};

export default cookie
