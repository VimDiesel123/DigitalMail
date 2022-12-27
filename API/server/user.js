const { getDb } = require('./db');

async function byID(userId) {
  const db = getDb();
  const user = await db.collection('users').findOne({ userId });
  return user;
}

module.exports = { byID };
