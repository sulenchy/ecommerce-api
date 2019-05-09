const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index')
const should = chai.should();

chai.use(chaiHttp);


describe('Default route', ()=>{
    it('should return default route message', async () => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.message.should.be.eql('Welcome to Ecommerce API !!!');
        });
    })
    it('should return status code 404', async ()=>{
        chai.request(app)
        .get('/me')
        .end((err, res) => {
            res.should.have.status(404)
        })
    })
})