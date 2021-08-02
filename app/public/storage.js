const Data = function () {
    const KEY_PROJECT = 'PROJECT'
    const KEY_TOKEN = 'TOKEN_'
    const KEY_LAST_ROUTER = 'LAST_ROUTER'

    const save = (obj) => {
        localStorage.setItem(KEY_PROJECT, JSON.stringify(obj))
    }

    const getProject = () => {
        return JSON.parse(localStorage.getItem(KEY_PROJECT))
    }

    const clearProject = () => {
        localStorage.removeItem(KEY_PROJECT)
    }

    const saveToken = (token) => {
        localStorage.setItem(KEY_TOKEN, token)
    }

    const getToken = () => {
        return localStorage.getItem(KEY_TOKEN)
    }

    const clearToken = () => {
        localStorage.removeItem(KEY_TOKEN)
    }

    const setLastRouter = (router) => {
        localStorage.setItem(KEY_LAST_ROUTER, router)
    }

    const getLastRouter = () => {
        return localStorage.getItem(KEY_LAST_ROUTER)
    }

    const clearLastRouter = () => {
        localStorage.removeItem(KEY_LAST_ROUTER)
    }

    const clearAll = () => {
        clearToken();
        clearProject();
        clearLastRouter();
    }
    return {
        save,
        getProject,
        clearProject,
        saveToken,
        getToken,
        clearToken,
        setLastRouter,
        getLastRouter,
        clearLastRouter,
        clearAll
    }
}()