import {date, dateStr} from "@/utils/func";

const localStorage = {
    set(name, value, type = 'str') {
        if (type === 'date') {
            window.localStorage.setItem(name, dateStr(value));
        } else {
            window.localStorage.setItem(name, JSON.stringify(value));
        }
    },
    get(name, type = 'str') {
        let tmp = null;
        if (type === 'date') {
            tmp = window.localStorage.getItem(name);
            return tmp ? date(tmp) : false
        } else {
            tmp = JSON.parse(window.localStorage.getItem(name));
            return tmp ? tmp : false
        }
    },
    del(name) {
        window.localStorage.removeItem(name);
    }
};

export default localStorage