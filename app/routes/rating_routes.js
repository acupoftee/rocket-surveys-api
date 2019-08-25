// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for ratings
const Rating = require('../models/rating')
const Prompt = require('../models/prompt')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { rating: { title: '', text: 'foo' } } -> { rating: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /ratings
router.get('/ratings', (req, res, next) => {
  Rating.find()
    .populate('owner')
    .then(ratings => {
      // `ratings` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return ratings.map(rating => rating.toObject())
    })
    // respond with status 200 and JSON of the ratings
    .then(ratings => res.status(200).json({ ratings: ratings }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /ratings/5a7db6c74d55bc51bdf39793
router.get('/ratings/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Rating.findById(req.params.id)
    .populate('prompt')
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "rating" JSON
    .then(rating => res.status(200).json({ rating: rating.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /ratings
router.post('/ratings', requireToken, (req, res, next) => {
  // set owner of new rating to be current user
  req.body.rating.owner = req.user.id
  let promptId = req.body.rating.survey
  let rating = req.body.rating
  Rating.create(req.body.rating)
    // respond to succesful `create` with status 201 and JSON of new "rating"
    .then(rating => {
      Prompt.findById(promptId)
        .then(foundPrompt => {
          foundPrompt.ratings.push(rating._id)
          let prompt = foundPrompt
          return foundPrompt.update(prompt)
        })
    })
    .then(() => {
      res.status(201).json({rating})
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /ratings/5a7db6c74d55bc51bdf39793
router.patch('/ratings/:id', removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.rating.owner

  Rating.findById(req.params.id)
    .then(handle404)
    .then(rating => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, rating)

      // pass the result of Mongoose's `.update` to the next `.then`
      return rating.update(req.body.rating)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /ratings/5a7db6c74d55bc51bdf39793
router.delete('/ratings/:id', requireToken, (req, res, next) => {
  Rating.findById(req.params.id)
    .then(handle404)
    .then(rating => {
      // throw an error if current user doesn't own `rating`
      requireOwnership(req, rating)
      // delete the rating ONLY IF the above didn't throw
      rating.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
