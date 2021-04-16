

const ProjectController = function(name){
    async function getAll (params) {
        const resposta = await API.get(name, {params})
        return resposta.data.listaProjetos
    }
    
    async function getId (id) {
        try {
            const rota  = `${name}/${id}`
            const resposta = await API.get(rota)
            return resposta.data.project
        }catch(e) {
            console.log(e)
            console.error(e)
            alert(e.response.data.error)
        }
    }

    async function update (project) {
        try {
            const resposta = await API.put(name, project)
            return resposta.data.project
        }catch(e) {
            console.log(e)
            console.error(e)
            alert(e.response.data.error)
        }
    }
    
    async function create (project) {
        try {
            const resposta = await API.post(name, project)
            return resposta.data.project

        }catch(e) {
            console.error(e)
            alert(e.response.data.error)
        }
    }

    async function saveOrEdit (form) {
        view.loading_show()

        const nodeList = form.querySelectorAll('input')
        const isEdit = form.dataset.id != "null"
        
        if (isEdit) {
            const Project = await ProjectController.getId(form.dataset.id)    
            nodeList.forEach((el) => {
                Project[el.name] = el.value
            })

            const project = await ProjectController.update(Project)
            Data.save(project)
        }else {
            const Project = {}
            nodeList.forEach((el) => {
                Project[el.name] = el.value
            })
            console.log('Project', Project)
            let project = await ProjectController.create(Project)

            if (project != undefined) {
                Data.save(project)
            }
                
        }

        view.render_kanban()
        view.loading_hide()
    }
    
    async function getProgressCompleted () {
        try {
            const router = `${name}/progress`
            const resposta = await API.get(router)
            return resposta.data.progress
        }catch(e) {
            console.error(e)
            alert(e.response.data.error)
        }
    }
    
    return {
        getProgressCompleted,
        getAll,
        getId,
        update,
        create,
        saveOrEdit
    }
}('/project')

