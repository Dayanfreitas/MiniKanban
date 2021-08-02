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

async function openModelLogin() {
    Modal.open({
        name: "Login",
        callback: () => {
            console.log('CALLBACK');
        },
        dataset: {
            id: ''
        },
        HTML: "Teste"
    })
}

async function readTextFile(file)
{
    return new Promise( async (resolve, reject) => {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = async function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    resolve(allText);
                }
            }
        }

        rawFile.send(null);
    })
}
const router = function (r) {
    let routes = r
    const middleware = {}

    const setLastRoute = (path) => {
        const lastRoute = middleware.data.getLastRouter();
        if (lastRoute != path) {
            middleware.data.setLastRouter(path)
        }
    }

    const go = (path) => {
        for (const e of routes) {
                e.then((route)=> {
                    if (path != route.path){return;}


                    setLastRoute(path)
                    middleware.root.innerHTML = route.template
                })
        }
    }

    const back = () => {
        console.log('router back')
        console.log(middleware.data.getLastRouter())

    }

    const use = (name, obj) => {
        middleware[name] = obj;
    }

    const initialize = async () => {
        routes = routes.map(async (e) => {
            e.template = await readTextFile(e.template_path);
            return e
        })
    }

    initialize()

    return {
        routes,
        go,
        back,
        use
    }

}(
    [
        { path: '/login', template_path: '/views/users/login.html'},
        { path: '/dashboard', template_path: '/views/dashboard.html'},
    ]
)


async function  login() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    try {
        const resposta = await API.post('/sessions', {email, password})
        if (resposta.data.token) {
            Data.saveToken(resposta.data.token);
            window.location.replace("http://localhost:8080");
            NoticeAlert.flash({msg: resposta.data.message, type: 'success'});
        }
    }catch (e) {
        NoticeAlert.flash({msg: e.response.data.message, type: 'error'})
    }





}

router.use('root', ROOT)
router.use('data', Data)
if (!Data.getToken()) {
    router.go('/login')
}else {
    router.go('/dashboard')
}
// console.log(NoticeAlert)
// NoticeAlert.flash({msg: 'parabens', type: 'error'})