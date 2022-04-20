const supertest = require('supertest')
import { cdg } from '../utils/index'
import app from '../index'
const request = supertest(app)

describe("Test Api par défaut :: ", () => {
    let _id:any = cdg.string.generateObjectId()

    let response = {
        status: 200,
        message: 'Enregistrement réussie!',
        data:{}
    }
    it("container",async ()=>{
        const {body} = await request.get('/api/v1/coddyger/container')
        expect(body).toMatchObject({status: 201, message: 'Service is Up', data: 'version:1.0.1'})
    })
    it("Enregistrer un document", async () => {
        let title = cdg.generateSlug();
        const {body} = await request.post('/api/v1/coddyger/save').send({_id, title, category: 'microservice'})
        expect(body).toMatchObject(response)
    })
    it("Liste des enregistrements", async () => {
        const {body} = await request.get('/api/v1/coddyger/select').send()
        expect(body).toMatchObject({
            status: 200,
            message: 'ok',
        })
    }) 
    it("Données d'un enregistrement", async () => {
        const {body} = await request.get(`/api/v1/coddyger/select/${_id}`).send()
        expect(body).toMatchObject({
            status: 200,
        })
    })
    it("Supprimer un enregistrement", async () => {
        const {body} = await request.delete(`/api/v1/coddyger/remove/${_id}`).send()
        expect(body).toMatchObject({
            status: 200,
        })
    })
})
