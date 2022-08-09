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

  const chat = await db.collection('chats').findOne({id: +chatId})

  console.log(chat)

  const quotes = await db.collection('quotes')
    .find({ peer_id: +chatId })
    .sort({ id: -1 })
    .toArray()

  const userIds = new Set()
  function getUniqueUserIds(root) {
    userIds.add(root.from_id)
    for (const message of root.fwd_messages) {
      userIds.add(message.from_id)
      getUniqueUserIds(message)
    }
  }

  quotes.forEach(quote => getUniqueUserIds(quote))

  console.log(userIds)

  const users = await db.collection('cache')
    .find({ id: { $in: Array.from(userIds) } })
    .toArray()

  console.log(users)

  res.json({ chat, quotes, users })
})

module.exports = router
