const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Product workflow tests', () => {

    it('should register + login a user, create product and VERIFY 1 in DB', (done) => {

        // 1) Register new user dsadsa
        let user = {
            name: "Peter Petersen",
            email: "mail@petersen.com",
            password: "12345678"
        }
        chai.request(server)
            .post('/api/user/register')
            .send(user)
            .end((err, res) => {

                // Asserts
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.equal(null);

                // 2) Login the user
                chai.request(server)
                    .post('/api/user/login')
                    .send({
                        "email": "mail@petersen.com",
                        "password": "12345678"
                    })
                    .end((err, res) => {
                        // Asserts                        
                        expect(res.status).to.be.equal(200);
                        expect(res.body.error).to.be.equal(null);
                        let token = res.body.data.token;
                    
                        // 3) Create new product
                        let appointment =
                        {
                            appointmentName: "Fodbold Golf"
                        };

                        chai.request(server)
                            .post('/api/appointment')
                            .set({ "auth-token": token })
                            .send(appointment)
                            .end((err, res) => {

                                // Assertsx
                                expect(res.status).to.be.equal(201);
                                expect(res.body).to.be.a('array');
                                expect(res.body.length).to.be.eql(1);

                                let savedProduct = res.body[0];
                                expect(savedProduct.appointmentName).to.be.equal(appointment.appointmentName);

                                // 4) Verify one product in test DB
                                chai.request(server)
                                    .get('/api/appointment/')
                                    .end((err, res) => {

                                        // Asserts
                                        expect(res.status).to.be.equal(200);
                                        expect(res.body).to.be.a('array');
                                        expect(res.body.length).to.be.eql(1);

                                        done();
                                    });
                            });
                    });
            });
    });

    it('should register + login a user, create product and DELETE it from DB', (done) => {

        // 1) Register new user
        let user = {
            name: "Peter Petersen",
            email: "mail@petersen.com",
            password: "12345678"
        }
        chai.request(server)
            .post('/api/user/register')
            .send(user)
            .end((err, res) => {

                // Asserts
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.equal(null);

                // 2) Login the user
                chai.request(server)
                    .post('/api/user/login')
                    .send({
                        "email": "mail@petersen.com",
                        "password": "12345678"
                    })
                    .end((err, res) => {
                        // Asserts                        
                        expect(res.status).to.be.equal(200);
                        expect(res.body.error).to.be.equal(null);
                        let token = res.body.data.token;

                        // 3) Create new product
                        let appointment =
                        {
                            appointmentName: "Fodbold Golf"
                        };

                        chai.request(server)
                            .post('/api/appointment')
                            .set({ "auth-token": token })
                            .send(appointment)
                            .end((err, res) => {

                                // Asserts
                                expect(res.status).to.be.equal(201);
                                expect(res.body).to.be.a('array');
                                expect(res.body.length).to.be.eql(1);

                                let savedProduct = res.body[0];
                                expect(savedProduct.appointmentName).to.be.equal(appointment.appointmentName);


                                // 4) Delete product
                                chai.request(server)
                                    .delete('/api/appointment/' + savedProduct._id)
                                    .set({ "auth-token": token })
                                    .end((err, res) => {

                                        // Asserts
                                        expect(res.status).to.be.equal(200);
                                        const actualVal = res.body.message;
                                        expect(actualVal).to.be.equal('appointment was succesfully deleted.');
                                        done();
                                    });

                            });
                    });
            });
    });
});