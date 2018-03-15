'use strict';

const knex = require('../knex');
const express = require('express');
const router = express.Router();



/* ========== POST/CREATE ITEM ========== */
router.post('/tags', (req, res, next) => {
  const { name } = req.body;
  
  if (!name) {
    const err = new Error('Missing `tag name` in request body');
    err.status = 400;
    return next(err);
  }
  
  const newItem = { name };
  
  knex.insert(newItem)
    .into('tags')
    .returning(['id', 'name'])
    .then((results) => {
      const result = results[0];
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => next(err));
});


module.exports = router;