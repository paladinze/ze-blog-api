const express = require('express');
const router = express.Router();

const movieModel = require('../models/movie');


router.get('/', async (req, res) => {
  const movies = await movieModel.query();
  res.json(movies);
});

router.get('/:id', async (req, res) => {
  const theMovie = await movieModel.query().findById(req.params.id);
  res.json(theMovie);
});

router.put('/:id', async (req, res) => {
  const theMovie = await movieModel.query().findById(req.params.id);
  if (!theMovie) {
    return res.status(400).send('resource not found')
  }
  // TODO update movie
});


router.post('/', async (req, res) => {
  const body = req.body

  const newMovie = await movieModel.query()
    .allowInsert('[name, year, director]')
    .insertGraph(body)

  res.json(newMovie)
})

router.delete('/:id', async (req, res) => {
  await movieModel.query().deleteById(req.params.id)

  res.redirect('/movies')
})

module.exports = router;