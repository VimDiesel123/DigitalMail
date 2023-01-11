const { ObjectId } = require('mongodb');
const { getDb } = require('./db');

async function byID(mailId) {
  const db = getDb();
  const user = await db.collection('users').findOne({ mail: { $elemMatch: { id: mailId } } });
  console.log(user);
  return user.mail.find((mail) => mail.id === mailId);
}

async function update(mailId, updates) {
  const db = getDb();
  const objectId = ObjectId(mailId);

  const options = { upsert: false };

  const newUpdates = Object.fromEntries(
    Object.entries(updates).map(([key, value]) => [`mail.$.${key}`, value]),
  );

  const { modifiedCount } = await db
    .collection('users')
    .updateOne({ mail: { $elemMatch: { id: objectId } } }, { $set: newUpdates }, options);

  return modifiedCount === 1;
}

const markAsRead = async (mailId) => update(mailId, { unread: false });

const trash = async (mailId) => update(mailId, { trashed: true });

const recover = async (mailId) => update(mailId, { trashed: false });

const favorite = async (mailId) => update(mailId, { favorited: true });

const unfavorite = async (mailId) => update(mailId, { favorited: false });

module.exports = { byID, markAsRead, trash, recover, favorite, unfavorite };
