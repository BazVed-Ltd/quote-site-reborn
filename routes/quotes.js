const express = require('express')
const { getDb } = require('../database/conn')
const router = express.Router()

/* GET users listing. */
router.get('/', async function (req, res) {
  const db = getDb()
  const quotes = await db.collection('quotes').find({}).toArray()

  res.json(quotes)
})

module.exports = router
