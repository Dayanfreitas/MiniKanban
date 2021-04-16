

const TaskController = function(name) {
    async function getAll (params) {
        try {
            const resposta = await API.get(name, {params})
            return resposta.data
        }catch {
            console.error(e)
        }
    }
    
    async function getId (id) {
        try {
            const rota  = `${name}/${id}`
            const resposta = await API.get(rota)
            return resposta.data.task
        }catch(e) {
            console.error(e)
        }
    }

    async function update (taks) {
        try {
            const resposta = await API.put(name, taks)
            return resposta.data.task
        }catch(e) {
            console.log(e)
            console.error(e)
            alert(e.response.data.error)
        }
    }
    
    async function create (task) {
        try {
            const resposta = await API.post(name, task)
            return resposta.data.task.id
        }catch(e) {
            console.error(e)
            alert(e.response.data.error)
        }
    }

    async function saveOrEditTask (form) {
        view.loading_show()
        const nodeList = form.querySelectorAll('input')
        const isEdit = form.dataset.id != "null"
        
        if (isEdit) {
            const Task = await TaskController.getId(form.dataset.id)    
            nodeList.forEach((el) => {
                Task[el.name] = el.value
            })

            await TaskController.update(Task)
        }else {
            const Task = {
                id_projeto: Data.getProject().id
            }

            nodeList.forEach((el) => {
                Task[el.name] = el.value
            })

            await TaskController.create(Task)
        }
        view.render_kanban()
        view.loading_hide()
    }

    return {
        getAll,
        getId,
        update,
        create,
        saveOrEditTask
    }
}('/task')