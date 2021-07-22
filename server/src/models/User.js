const Password = require('objection-password')();
const { Model } = require('objection');
const jwt = require('jsonwebtoken');


class User extends Password(Model) {
    // static beforeInsert(args) {
    //     console.log('Teste action !!')
    // }

    static get tableName() {
        return 'users';
    }

    generateToken () {
        return jwt.sign({ id: this.id }, process.env.APP_SECRET);
    }
    
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                password: { type: 'string' },
            }
        }
    }
}

module.exports = User