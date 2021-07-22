const request = require("supertest");
const {Model , transaction} = require('objection');
const knex = require('./src/database/connection');

global.request = request
global.beforeAll(async () => {
    global.knex = knex;
    Model.knex(knex);
    global.txn = null;
});

global.beforeEach(async () => {
    global.txn = await transaction.start(knex);
    Model.knex(global.txn);
});

global.afterEach(async () => {
    await global.txn.rollback();
    Model.knex(knex);
});

global.afterAll(async () => {
    global.knex.destroy();
});