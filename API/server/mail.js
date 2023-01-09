const { getDb } = require('./db');

async function byID(mailId) {
  const db = getDb();
  const user = await db.collection('users').findOne({ mail: { $elemMatch: { id: mailId } } });
  console.log(user);
  return user.mail.find((mail) => mail.id === mailId);
}

async function markAsRead(mailId) {
  const db = getDb();

  const options = { upsert: false };
  const { modifiedCount } = await db
    .collection('users')
    .updateOne({ mail: { $elemMatch: { mailId } } }, { $set: { 'mail.$.unread': false } }, options);
  return modifiedCount === 1;
}

module.exports = { byID, markAsRead };
