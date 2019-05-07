const Midware = (store) => (next) => (action) => {
    if(typeof action !== 'function') {
        return next(action);
    }

    return action(store.dispatch);
}

export default Midware;