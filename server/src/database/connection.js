 const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../../knexfile');

const knex = Knex(process.env.NODE_ENV === 'test' ? knexConfig.test : knexConfig.development);
Model.knex(knex);

module.exports = knex;