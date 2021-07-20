const request = require("supertest");
const app = require("../../src/app");

describe("Authenticated", () => {

    it("should receive JWT token when authenticated with valid crendentials", async () => {
        const response = await request(app)
            .post('/sessions')
            .send({
                email: "dayan@gmail.com",
                password: "123456"
            })
        expect(response.status).toBe(200)
    })
})