const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const customerCtrl = require('../../controllers/customers');
const app = require('../../index')
const should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);


describe('Customer controller ', () => {
    it('should return default route message', (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.message.should.be.eql('Welcome to Ecommerce API !!!')
            done();
        });
    })
    it('should not login customer', () => {

    })
    it('should login customer', () => {

    })
    it('should not create customer', () => {
        
    })
    it('should create customer', () => {
          
    })
    it('should not update customer address info', () => {    
    
    })
    it('should update customer address info', () => {
        
    })
})

