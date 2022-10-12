const connection = require('../database/connection');
const status = {
    PENDENTE: 'P',
    EM_ANDAMENTO: 'A',
    CONCLUIDO: 'CON',
    CANCELADO: 'CAN'
}

async function calcProcess(id_projeto) {
    const genereteDate = (stringDatePtBR) => {
        const [dia, mes, ano] = stringDatePtBR.split('/')
        return new Date(`${ano}-${mes}-${dia}`)
    }
    const projectObj = await connection('project').where({id: id_projeto})
    let listTasks =  await getAllForProject(id_projeto)
    
    let isLate = projectObj.atrasado
    let progress = 0
    
    if (listTasks.length > 0) {
        const listTasksFinish = listTasks.filter(el => BooleanFlag(el.finalizada));
        progress = Math.floor((listTasksFinish.length * 100) / listTasks.length);

        //PROCESS ATRASO
        // listTasks = listTasks.filter(el => el.status != status.CONCLUIDO && el.status != status.CANCELADO)
        // console.log('listTasks,', listTasks)
        let listDate = listTasks.map(el => new Date(genereteDate(el.data_fim)))
        listDate = listDate.sort((a, b) => a - b);
        const dateProject = genereteDate(projectObj[0].data_final)
        const majorActivityDateTask = listDate[listDate.length-1]
        isLate = majorActivityDateTask > dateProject
    }

    await connection('project').where({ id: id_projeto }).update({ progresso: progress, atrasado: isLate });
}

function BooleanFlag (number) {
    return number == 1 
    
}

function isFinish (status) {
    return ['CON', 'CAN'].includes(status)
}



async function getById (id) {
    const task = await connection.table('task').where({id})

    if(!task.length) {
        return undefined
    }

    return task[0]
}

async function getAllForProject (id) {
    const id_projeto = id
    return await connection.table('task').where({id_projeto})
    
}

module.exports = {
    async getAll (req, res) {
        const {id_projeto} = req.query
        let listTask = await connection.select().table('task')

        if (id_projeto) {
            listTask = await getAllForProject(id_projeto)
        }

        return res.status(200).json({listTask, msg: ''})
    },
    
    async getId (req, res) {
        const {id} = req.params
        const task = await getById(id)
        
        if (task == undefined) {
            return res.status(400).json({error: 'Task not found !'})
        }

        return res.json({task, msg: 'Task found ! '})
    },
    
    async create (req, res) {
        try {
            const Task = req.body
            const Project = await connection.table('project').where({id: Task.id_projeto})

            if (Project == undefined) {
                return res.status(400).send({ error: 'Project not found !'});
            }

            const id = await connection('task').insert(Task)
            const task = await getById(id)

            await calcProcess(task.id_projeto)
            return res.status(200).json({task, msg: 'Successfully created'})
            
        } catch (e) {
            return res.status(400).send({ error: 'Could not update data'});
        }

    },
    
    async update (req, res) {
        try {
            let {id, descricao, id_projeto, data_inicio, data_fim, finalizada, status} = req.body

            finalizada = isFinish(status)
            
            const taskOBJ = await connection('task').where({id}).update({descricao, data_inicio, data_fim, finalizada, status})
            // console.log(ProjectController)

            await calcProcess(id_projeto);

            return res.json({task: taskOBJ, msg: 'Successfully updated !'})
        } catch (e) {
            console.error(e)
            return res.status(400).send({ error: 'Could not update data'});
        }
    },
    
    async delete (req, res) {
        return res.json({msg: 'Delete'})
    },
    
    async calcProcess(id) {
        calcProcess (id)
    }
}
