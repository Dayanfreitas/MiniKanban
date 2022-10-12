
const view = function(){
    let currentProject = null
    let filterStatus = document.querySelector('#filtro_status')

    const STATUS = {
        "CAN": 'red',
        "CON": 'green',
        "P": 'yellow',
        "A": 'blue',
        
    }
    const PROJECT_STATUS = {
        ATIVO: 'A',
        INATIVO: 'I'
    }
    const BOARD_STATUS = {
        'dropzone-pendente': "P",
        'dropzone-em-andamento' : "A",
        'dropzone-concluida' : "CON",
        'dropzone-cancelada': "CAN"
    }

    const add_event_card = () => {        
        const cards = document.querySelectorAll('.card')
        const dropzones = document.querySelectorAll('.dropzone')

        cards.forEach(card => {
            card.addEventListener('dragstart', dragstart)
            card.addEventListener('drag', drag)
            card.addEventListener('dragend', dragend)
            card.addEventListener('dblclick', edit)
        })

        function dragstart () {
            dropzones.forEach(dropzone => dropzone.classList.add('hightligth'))
            this.classList.add('is-dragging')
        }

        function drag () {
            this.classList.add('is-dragging')
        }

        async function dragend () {
            dropzones.forEach(dropzone => dropzone.classList.remove('hightligth'))
            this.classList.remove('is-dragging')
            const {id} = this.dataset
            const currentBord = this.parentNode
            
            if (!id) {return};
            
            loading_show()
            const Task = await TaskController.getId(id)
            Task.status = BOARD_STATUS[currentBord.id]
            await TaskController.update(Task)
            await render_kanban()
            

            setTimeout(() => {
                loading_hide()
            }, 400)
        }

        function edit () {
            // console.log('EDIT', this)
            const {id} = this.dataset
            if (!id) return;

            // console.log('ID PARA EDITAR', id)

            loading_show()

            setTimeout(async () => {
                const Task = await TaskController.getId(id)
                if(!Task.finalizada) {
                    Modal.openEditTask(Task, TaskController.saveOrEditTask)
                }

                loading_hide()
            }, 200)
        }

        dropzones.forEach(dropzone => {
            dropzone.addEventListener('dragenter', dragenter)
            dropzone.addEventListener('dragover', dragover)
            dropzone.addEventListener('dragleave', dragleave)
            dropzone.addEventListener('drop', drop)
        })
        
        function dragenter () {
            // console.log('> DROPZONE enter dropzone')
        }

        function dragover () {
            // console.log('> DROPZONE: OVER')
            this.classList.add('over')
            // this.classList.add('is-dragging')
            const cardBeinDraagged = document.querySelector('.is-dragging')
            if(cardBeinDraagged) {
                this.appendChild(cardBeinDraagged) 
            }
        }

        function dragleave () {
            // console.log('> DROPZONE: LEAVE')
            this.classList.remove('over')

        }

        function drop (event) {
            console.log('> DROPZONE: DROP', event)
            // this.classList.remove('over')
            // const cardBeinDraagged = document.querySelector('.is-dragging')
        }
    }

    const clearChild = (list) => {
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
    }

    const loading_hide = () => {
        document.querySelector('#loading').classList.remove('loading')
        document.querySelector('#loading').innerHTML = ''

    }
    
    const loading_show = () => {
        document.querySelector('#loading').classList.add('loading')
        document.querySelector('#loading').innerHTML = 'Loading&#8230;'
    }

    const createSelectOptionsProject = async () => {
        filterStatus = document.querySelector('#filtro_status')
        let status = filterStatus && filterStatus.checked ? ['A', 'I'] : ['A']
        let listProject = await ProjectController.getAll({status})

        const clearChild = (list) => {
            while (list.hasChildNodes()) {
                list.removeChild(list.firstChild);
            }

            op = document.createElement("option")
            op.id = 'selecione'
            op.value = null
            op.selected = true
            op.innerHTML = "Selecione o projeto"
            list.appendChild(op)
        }

        let selectProject = document.getElementById("select_project")
        clearChild(selectProject)

        listProject.forEach(e => {
            // console.log('projeto' + e.id)
            // console.log('projeto',e)

            let op = document.createElement("option")
            op.id = e.nome + '_' + e.id
            op.innerHTML = e.nome
            op.value = e.id

            
            if(Data.getProject() && Data.getProject().id == e.id) {
                op.selected = true
            }

            selectProject.appendChild(op)
        });
    }

    function BooleanFlag (number) {
        return number == 1 
    }
    


    const render_kanban = async () => {
        await createSelectOptionsProject();
        
        const currentProject = Data.getProject()
        if (currentProject == null) {return};

        let response = await TaskController.getAll({id_projeto: currentProject.id})
        let list = response.listTask
        
        let containerBoards = document.querySelector("#container-boards")
        
        let btnAddTask = document.querySelector("#btn-add-task")
        let btnProjectDisable = document.querySelector("#btn-project-disable")
        let btnProjectEnable = document.querySelector("#btn-project-enable")

        btnAddTask.style.display = "none"        
        btnProjectDisable.disabled = true
        btnProjectEnable.disabled = false

        let dropzonePendente = document.querySelector("#dropzone-pendente")
        let dropzoneEmAndamento = document.querySelector("#dropzone-em-andamento")
        let dropzoneConcluida = document.querySelector("#dropzone-concluida")
        let dropzoneCancelada = document.querySelector("#dropzone-cancelada")

        clearChild(dropzonePendente)
        clearChild(dropzoneEmAndamento)
        clearChild(dropzoneConcluida)
        clearChild(dropzoneCancelada)
        
        if (currentProject.status == PROJECT_STATUS.INATIVO){
            containerBoards.style.display = "none"
            render_project_details()
            renderProgressBarAllProject()

            return
        };
        containerBoards.style.display = "flex"
        
        document.querySelector("#btn-add-task").style.display = "block"
        btnProjectDisable.disabled = false
        btnProjectEnable.disabled = true
        

        let listCardDropzoneInProgress = []
        let listCardDropzoneConcluded  = []
        let listCardDropzoneCanceled   = []
        let listCardDropzonePending    = []
       
        list.forEach((e) => {
            // console.log(e)

            const card = `
            <div id="atividade_${e.id}" class="card" draggable="true" data-id="${e.id}">
                <div class="status ${STATUS[e.status]} "></div>
                <div class="content finish_${BooleanFlag(e.finalizada)}">${e.descricao}</div>
            </div>
            `

            if (e.status == "P") {
                listCardDropzonePending.push(card)
                // dropzonePendente.innerHTML += template
            }else if (e.status == "CAN") {
                listCardDropzoneCanceled.push(card)
                // dropzoneCancelada.innerHTML += template
            }else if (e.status == "CON") {
                listCardDropzoneConcluded.push(card)
                // dropzoneConcluida.innerHTML += template
            }else if (e.status == "A") {
                listCardDropzoneInProgress.push(card)
                // dropzoneEmAndamento.innerHTML += template
            }
            add_event_card()  
        })
        
        dropzonePendente.innerHTML = listCardDropzonePending.join(' ')
        dropzoneCancelada.innerHTML = listCardDropzoneCanceled.join(' ')
        dropzoneConcluida.innerHTML = listCardDropzoneConcluded.join(' ')
        dropzoneEmAndamento.innerHTML = listCardDropzoneInProgress.join(' ')
        
        add_event_card()  
        render_project_details()
        renderProgressBarAllProject()
    }

    const renderProgressBarAllProject = async () => {

        const progress = await ProjectController.getProgressCompleted()
        const progressBarAllProject = document.querySelector("#progress-bar-all-project")
        progressBarAllProject.innerHTML = `
            <div class="progress-bar" style="width:${progress}%">${progress}%</div>
        ` 
    }

    const render_project_details = async () => {
        const currentProject = Data.getProject()
        if (currentProject == null ||  currentProject == undefined ) {return};
        let project = await ProjectController.getId(currentProject.id)
        if (project == null ||  project == undefined ) {return};
        let containerProjectDetails = document.querySelector('#project_details')
        containerProjectDetails.innerHTML = `
        <div>
            <span>Nome: ${project.nome}</span>
            -
            <span> 
            Status:
                ${project.status == "A" ? '<span class="tag in-day">Ativo</span>': '<span class="tag overdue">Inativo</span>'} e
                ${BooleanFlag(project.atrasado) ? '<span class="tag overdue">em atraso</span>' : '<span class="tag in-day">em dia</span>'}
            </span>

            
        </div>

        <span>Data de inicial: ${project.data_inicial}</span>
        -
        <span>Data da final: ${project.data_final} </span>
        <div>
            Atividades concluídas: ${project.progresso} %
            <div class="container-progress-bar">
                <div class="progress-bar" style="width:${project.progresso}%">${project.progresso}%</div>
            </div>
        </div>
        `
    }

    const setCurrentProject = (project) => {
        View.currentProject = project
    }
    
    return {
        createSelectOptionsProject,
        loading_hide,
        loading_show,
        render_kanban,
        clearChild,
        add_event_card,
        setCurrentProject,
        currentProject,
        STATUS,
        PROJECT_STATUS
    }
}()

