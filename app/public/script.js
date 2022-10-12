const ROOT = document.querySelector("#root")
console.log('Init...')
console.log('ROOT', ROOT);

// Data.clearProject()
// view.loading_hide()
// view.loading_show()
// view.render_kanban()

async function changeProject (event) {
    event.preventDefault()

    const {value} = event.target
    if (value == "null") {return};
    view.loading_show()
    
    const project = await ProjectController.getId(value)
    Data.save(project)
    view.render_kanban()

    setTimeout(() => {
        view.loading_hide()
    },200)
}

async function addNewTask() {
    Modal.openAddTask(TaskController.saveOrEditTask)
}

function addNewProject() {
    Modal.openAddProject(ProjectController.saveOrEdit)
}

function editProject() {
    const currentProject = Data.getProject()
    Modal.openEditProject(currentProject, ProjectController.saveOrEdit)
}

async function deleteProject () {
    const currentProject = Data.getProject()
    view.loading_show()
    currentProject.status = view.PROJECT_STATUS.INATIVO
    const project = await ProjectController.update(currentProject)
    Data.save(project)

    setTimeout(() => {
        view.render_kanban()
        view.loading_hide()
    }, 200);
}

async function activedProject () {
    const currentProject = Data.getProject()
    view.loading_show()
    currentProject.status = view.PROJECT_STATUS.ATIVO
    const project = await ProjectController.update(currentProject)
    Data.save(project)
    
    setTimeout(() => {
        view.loading_hide()
        view.render_kanban()
    }, 200)

}

async function login() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    Session.login({ email, password })
}

function logout() {
    Session.logout()    
}

router.use('root', ROOT)
router.use('data', Data)

if (!Data.getToken()) {
    router.go('/login')
}else {
    router.go('/dashboard')
    view.render_kanban()
}
