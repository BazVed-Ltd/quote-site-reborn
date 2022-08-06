const { MongoClient } = require('mongodb')

const defaultMongoUri = 'mongodb://mongodb:mongodb@mongodb:27017'
const client = new MongoClient(process.env.MONGODB_URI || defaultMongoUri)

let dbConnection

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err)
      }

      dbConnection = db.db(process.env.MONGODB_DB_NAME || 'quote_dev')

      return callback()
    })
  },

  getDb: function () {
    return dbConnection
  }
}
