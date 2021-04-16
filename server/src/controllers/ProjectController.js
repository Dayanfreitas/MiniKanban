const connection = require('../database/connection');
const TaskController = require('./TaskController')
async function getById (id) {
    let projects = await connection.table('project').where({id})

    if(!projects.length) {
        return undefined
    }

    return projects[0]
}

module.exports = {
    async getAll (req, res) {
        if(req.query.status && req.query.status.length) {
            const listProject = await connection.select().table('project').whereIn('status', req.query.status)
            return res.status(200).json({listaProjetos: listProject, msg: ''})

        }
        const listProject = await connection.select().table('project')
        return res.status(200).json({listaProjetos: listProject, msg: ''})
    },

    async getProgressCompleted (req, res) {
        let progress = 0
        let listProject = await connection('project').where({status : 'A'})
        let listProjectCompleted = await connection('project').where({status : 'A', progresso: 100})
        if (listProject.length > 0 && listProjectCompleted.length > 0) {
            progress = Math.floor((listProjectCompleted.length*100) / listProject.length)
        }
        
        return res.status(200).json({progress, listProject: listProject.length, listProjectCompleted:listProjectCompleted.length ,msg: 'Get successfully !'})
    },
    
    async getId (req, res) {
        const {id} = req.params
        let project = await getById(id)
        console.log('project', project)
        
        if(project == undefined) {
            return res.status(400).json({error: 'Project not found !'})
        }

        return res.json({project, msg: 'Project found !'})
    },

    async create (req, res) {
        let project = req.body        
        const id = await connection('project').insert(project)           
        const projectOBJ = await getById(id)
        
        if (projectOBJ == undefined) {
            return res.status(400).json({error: 'Project not found !'})
        }
        

        return res.json({id, project: projectOBJ, msg: 'Project successfully created !'})
    },
    
   

    async update (req, res) {
        try {
            const { id, nome, data_inicial, data_final, progresso, status, atrasado} = req.body
            
            const ProjectObj = await connection('project').where({id}).update({nome, data_inicial, data_final, status});
            
            if(ProjectObj == 0) {
                return res.status(400).send({ error: 'Not found' });
            }
            const project = await getById(id);
            await TaskController.calcProcess(id)
            return res.json({project, msg: 'Successfully updated !'})
        } catch (e) {

            return res.status(400).send({ error: 'Could not update data'});
        }
    },
    
    async delete (req, res) {
        return res.json({msg: 'Delete'})
    }
}