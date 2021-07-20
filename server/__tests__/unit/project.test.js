
const Project = require("../../src/models/Project")
describe("Project", () => {

    it("should create project", async () => { 
        const p1 = await  Project.query().insert({
            nome: "Projeto teste",
            data_inicial: '01/11/2021',
            data_final: '21/11/2021',
            progresso: 0,
            atrasado: 0,
            status: 'A'
        });

        
        expect(p1.nome).toBe("Projeto teste")
    })
})