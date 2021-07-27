const Password = require('objection-password')();
const { User } = require("../../src/models");

describe('User', () => {
    it('should encrypt user password', async () => {
        const password = '123456'
        const user = await User.query().insert({name: 'Dayan',email: 'dayan@gmail.com', password})
        
        expect(await user.verifyPassword(password)).toBe(true)
    })
})