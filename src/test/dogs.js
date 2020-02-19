require('dotenv').config()
const app = require("../index.js")
const mongoose = require('mongoose')
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const chaiHttp = require("chai-http")
const jwt = require('jsonwebtoken')
const assert = chai.assert

const User = require('../models/user.js')
const Dog = require('../models/dogs.js')

chai.config.includeStack = true

chai.should()
chai.use(chaiHttp)

// Sample MS Dog
const sampleDog = {
  name: 'Tahoe',
  breed: 'mountain dog',
  color: 'black and white'
}

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
  done();
});


describe('Dog API endpoints', () => {
  beforeEach((done) => {
    User.create({username: 'test_user', password: 'itsasecret'})
  })

  afterEach((done) => {
    User.remove({username: 'test_user'}).then(() => {
      Dog.remove({name: 'Tahoe'}).then(() => done())
    })
  })

  // Test Homepage
  it('should load about page', (done) => {
    chai.request(app)
      .get('/dogs/about')
      .set('jwttoken', jwt.sign({ username: 'test_user' }, process.env.JWT_SECRET))
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        assert.equal(res.status, 200)
        // Assert that message is sent properly
        assert.equal(res.body.message, 'Dogs are awesome!')
        return done()
      })
  })

  // Test Index
  it('should show all dogs', (done) => {
    let dog = new Dog(sampleDog);
    dog.save().then((savedDog) => {
      chai.request(app)
        .get('/dogs')
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          assert.equal(res.status, 200)
          assert.isArray(res.body)
          return done()
        })
    })
  })

  it('should show a specific dog', (done) => {
    let dog = new Dog(sampleDog);
    dog.save().then((savedDog) => {
      chai.request(app)
        .get(`/dogs/${savedDog._id}`)
        .set('jwttoken', jwt.sign({ username: 'test_user' }, process.env.JWT_SECRET))
        .end((err, res) => {
          if (err) return done(err);

          assert.equal(res.body.name, 'Tahoe')
          assert.equal(res.body.color, 'black and white')
          return done()
        })
    })
  })

  it('should POST a new dog', (done) => {
    chai.request(app)
      .post('/dogs')
      .set('jwttoken', jwt.sign({ username: 'test_user' }, process.env.JWT_SECRET))
      .send(sampleDog)
      .then(res => {
        assert.equal(res.status, 200)
        assert.equal(res.body.name, 'Tahoe')
        assert.equal(res.body.color, 'black and white')
        assert.isNotEmpty(res.body._id)

        // make sure data actually got added to the database
        Dog.find({name: 'Tahoe'}).then(result => {
          assert.equal(result.length, 1)
        })

        return done()
      }).catch(err => {
        return done(err)
      })
  })
})
