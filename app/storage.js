
const Data = function () {
    const KEY_PROJECT = 'PROJECT'
    
    const save = (obj) => {
        localStorage.setItem(KEY_PROJECT, JSON.stringify(obj))
    }
    
    const getProject = () => {
        return JSON.parse(localStorage.getItem(KEY_PROJECT))
    }
    
    const clearProject = () => {
        localStorage.removeItem(KEY_PROJECT)
    }
    
    


    return {save, getProject, clearProject}
}()