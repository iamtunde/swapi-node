const chai  = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app/server')

// Configure chai
chai.use(chaiHttp)
chai.should()

/* beforeEach(function () {
    this.timeout(120000);
}) */

describe("Fetch movies", () => {
    describe("GET /movies", () => {
        it("should return all movies available", (done) => {
            chai.request(app)
                .get('/movies/')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
                })
        }).timeout(120000)

        it("should get a single movie record", (done) => {
            const movie_id = 1
            chai.request(app)
                .get(`/movies/${movie_id}/`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
                })
        }).timeout(120000)

        it("should not return a movie record", (done) => {
            const movie_id = 100000
            chai.request(app)
                .get(`/movies/${movie_id}/`)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('object')
                    done()
                })
        }).timeout(120000)
    })
})