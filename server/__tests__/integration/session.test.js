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

    it("should not user", async () => {
        const response = await request(app)
            .post('/sessions')
            .send({
                email: '',
                password: validPassword
            })

        expect(response.status).toBe(401)
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

    it("should be able to acess private routes when authenticated", async () => {
        const user = await factory.create('User', { password: validPassword })
        
        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${user.generateToken()}`)

        expect(response.status).toBe(200);
    })
  
    it("should not be able to acess private routes it fout jwt token", async () => {
        const response = await request(app)
            .get('/dashboard')

        expect(response.status).toBe(401);
    })

    it("should not be able to access private routes with invalid jwt token", async () => {
        const user = await factory.create('User', { password: validPassword })
        
        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer 1232`)

        expect(response.status).toBe(401);
    })
})