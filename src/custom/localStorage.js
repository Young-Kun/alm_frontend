const localStorage = {
    set(name, value) {
        window.localStorage.setItem(name, value);
    },
    get(name) {
        const tmp = window.localStorage.getItem(name);
        return tmp ? tmp : false
    },
    del(name) {
        window.localStorage.removeItem(name);
    }
};

export default localStorage