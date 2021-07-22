// const request = require("supertest");

const factory = require("../factories");
const app = require("../../src/app");

describe("Authenticated", () => {
    const validPassword = "123456";
    const invalidPassword = "123123";

    it("should receive JWT token when authenticated with valid crendentials", async () => {
        const user = await factory.create('User', { password: validPassword })
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: validPassword
            })
        expect(response.status).toBe(200)
    })
    
    it("should return JWT token when authenticated", async () => {
        const user = await factory.create('User', { password: validPassword })
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: validPassword
            })
        
        expect(response.body).toHaveProperty("token")
    })

    it("should not authenticated if invalid crendentials", async () => {
        const user = await factory.create('User',{ password: validPassword })
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: invalidPassword
            })
        expect(response.status).toBe(401)
    })

    // it("should be able to acess private routes when authenticated", async () => {
    //     const user = await factory.create('User', { password: validPassword })
    //     const response = await request(app)
    //         .post('/sessions')
    //         .set('Authorization', `Bearer ${user.get}`)
    //         // .send({
    //         //     email: user.email,
    //         //     password: validPassword
    //         // })
    //     // expect(response.body).toHaveProperty("token")
    // })
})