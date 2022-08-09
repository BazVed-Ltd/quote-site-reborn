const express = require('express')
const { getDb } = require('../database/conn')
const router = express.Router()

router.get('/', async function (req, res) {
  const db = getDb()
  let chats = await db.collection('chats').find({}).toArray()

  const tasks = chats.map(
    async (chat) => {
      const count = await db.collection('quotes').countDocuments({ peer_id: chat.id })
      chat.count = count
      return chat
    })

  chats = await Promise.all(tasks)

  res.json(chats)
})

router.get('/:chatId', async function (req, res) {
  const db = getDb()
  const chatId = req.params.chatId

  const quotes = await db.collection('quotes')
    .find({ peer_id: +chatId === 0 ? null : +chatId })
    .sort({ id: -1 })
    .toArray()

  res.json(quotes)
})

module.exports = router
