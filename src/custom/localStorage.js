const localStorage = {
    set(name, value) {
        window.localStorage.setItem(name, JSON.stringify(value));
    },
    get(name) {
        const tmp = JSON.parse(window.localStorage.getItem(name));
        return tmp ? tmp : false
    },
    del(name) {
        window.localStorage.removeItem(name);
    }
};

export default localStorage