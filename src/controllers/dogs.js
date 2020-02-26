const express = require('express')

const Dog = require('../models/dogs.js')

const router = express.Router(); // eslint-disable-line new-cap

// GET homepage
router.get('/about', (req, res) => {
  res.send({ message: 'Dogs are awesome!' })
})

// GET list of dogs
router.get('/', (req, res) => {
  if (!req.user) {
    res.send({ err: 'Must be logged in' })
  } else {
    Dog.find().then(result => {
      res.json(result);
    })
  }
})

// GET specific dog
router.get('/:id', (req, res) => {
  if (!req.user) {
    res.send({ err: 'Must be logged in' })
  } else {
    Dog.findOne({_id: req.params.id}).then(result => {
      res.json(result);
    })
  }
})

// POST new dog.
router.post('/', (req, res) => {
  if (!req.user) {
    res.send({ err: 'Must be logged in' })
  } else {
    const dog = new Dog(req.body)
    dog.save().then(result => {
      res.json(result)
    })
  }
})

// TODO: Add more routes.


module.exports = router;
