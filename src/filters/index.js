const filters = {
    'fileSize': (value) => {
        if (value < 1024 * 1024) {
            return (value / 1024).toFixed(0) + 'KB';
        } else {
            return (value / 1024 / 1024).toFixed(0) + 'MB';
        }
    },
    'datetime': (value) => {
        const date = value.split('T')[0];
        const time = value.split('T')[1].split('.');
        return date + '@' + time[0];
    }
};
export default filters