const Modal = function () {
    var modal = document.getElementById("myModal");
    var containerModel = document.getElementById("container-model");
    var name = document.getElementById("name-modal");
    var span = document.getElementsByClassName("close")[0];
    
    let saveChange = (from) => {}

    const openEditTask = (Task, save) => {
        saveChange = save
        name.innerHTML = 'Editar Atividade'
        let template = `
            <div class="form-label">
                <label for="descricao">Descrição:</label>
                <input type="text" name="descricao" id="descricao" value="${Task.descricao}">
            </div>
            <div class="form-label">
                <label for="data_inicio">Data Inicial</label>
                <input type="text" name="data_inicio" id="data_inicio" value="${Task.data_inicio}" placeholder="dd/mm/aaaa">
            </div>
            <div class="form-label">
                <label for="data_fim">Data Final</label>
                <input type="text" name="data_fim" id="data_fim" value="${Task.data_fim}" placeholder="dd/mm/aaaa">
            </div>
        `
        containerModel.dataset['id'] = Task.id
        containerModel.innerHTML = template
        modal.style.display = "block";
    }
   
    const openAddTask = (save) => {
        saveChange = save
        name.innerHTML = 'Adicionar tarefa'
        let template = `
            <div class="form-label">
                <label for="descricao">Descrição:</label>
                <input type="text" name="descricao" id="descricao" value="">
            </div>
            <div class="form-label">
                <label for="data_inicio">Data Inicial</label>
                <input type="text" name="data_inicio" id="data_inicio" value="" placeholder="dd/mm/aaaa">
            </div>
            <div class="form-label">
                <label for="data_fim">Data Final</label>
                <input type="text" name="data_fim" id="data_fim" value="" placeholder="dd/mm/aaaa">
            </div>
        `
        containerModel.dataset['id'] = null
        containerModel.innerHTML = template
        modal.style.display = "block";
    }

    const openEditProject = (Project, save) => {
        saveChange = save
        name.innerHTML = 'Editar Projeto'
        let template = `
            <div class="form-label">
                <label for="nome">Nome:</label>
                <input type="text" name="nome" id="nome" value="${Project.nome}">
            </div>
            <div class="form-label">
                <label for="data_inicial">Data Inicial</label>
                <input type="text" name="data_inicial" id="data_inicial" value="${Project.data_inicial}" placeholder="dd/mm/aaaa">
            </div>
            <div class="form-label">
                <label for="data_final">Data Final</label>
                <input type="text" name="data_final" id="data_final" value="${Project.data_final}" placeholder="dd/mm/aaaa">
            </div>
        `
        containerModel.dataset['id'] = Project.id
        containerModel.innerHTML = template
        modal.style.display = "block";
    }
   
    const openAddProject = (save) => {
        saveChange = save
        name.innerHTML = 'Adicionar novo projeto'
        let template = `
            <div class="form-label">
                <label for="nome">Nome:</label>
                <input type="text" name="nome" id="nome" value="">
            </div>
            <div class="form-label">
                <label for="data_inicial">Data Inicial</label>
                <input type="text" name="data_inicial" id="data_inicial" value="" placeholder="dd/mm/aaaa">
            </div>
            <div class="form-label">
                <label for="data_final">Data Final</label>
                <input type="text" name="data_final" id="data_final" value="" placeholder="dd/mm/aaaa">
            </div>
        `
        containerModel.dataset['id'] = null
        containerModel.innerHTML = template
        modal.style.display = "block";
    }
    

    const open = (template) => {
        debugger
        const {id} = template.dataset
        saveChange = template.callback
        name.innerHTML = template.name


        containerModel.dataset['id'] = id || null
        containerModel.innerHTML = template.HTML
        modal.style.display = "block";
    }

    const reset = () => {
        containerModel.innerHTML = ''
        containerModel.dataset['id'] = null
     
    }
    
    const close = () => {
        modal.style.display = "none";
        reset()
    }

    span.onclick = function() {
        modal.style.display = "none";
        reset()
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        saveChange(containerModel).then(reset)
      }
    }

    return {
        open,
        close,
        openEditTask,
        openAddTask,
        openEditProject,
        openAddProject
    }
}()