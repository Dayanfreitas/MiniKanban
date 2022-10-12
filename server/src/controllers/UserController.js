const connection = require('../database/connection');
const TaskController = require('./TaskController')

module.exports = {
    async getAll (req, res) {
       
        return res.status(200).json({msg: ''})
    }
}