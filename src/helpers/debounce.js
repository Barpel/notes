function debounce(func, timeout = 2000) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = window.setTimeout(() => { func.apply(this, args); }, timeout);
    };
}


export { debounce };