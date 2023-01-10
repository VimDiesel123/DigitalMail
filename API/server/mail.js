const { ObjectId } = require('mongodb');
const { getDb } = require('./db');

async function byID(mailId) {
  const db = getDb();
  const user = await db.collection('users').findOne({ mail: { $elemMatch: { id: mailId } } });
  console.log(user);
  return user.mail.find((mail) => mail.id === mailId);
}

// TODO: (David) YIKES! DRY this out!

async function markAsRead(mailId) {
  const db = getDb();

  const options = { upsert: false };

  const objectId = ObjectId(mailId);

  const { modifiedCount } = await db
    .collection('users')
    .updateOne(
      { mail: { $elemMatch: { id: objectId } } },
      { $set: { 'mail.$.unread': false } },
      options,
    );

  return modifiedCount === 1;
}

async function trash(mailId) {
  const db = getDb();
  const objectId = ObjectId(mailId);

  const options = { upsert: false };

  const { modifiedCount } = await db
    .collection('users')
    .updateOne(
      { mail: { $elemMatch: { id: objectId } } },
      { $set: { 'mail.$.trashed': true } },
      options,
    );

  return modifiedCount === 1;
}

async function recover(mailId) {
  const db = getDb();
  const objectId = ObjectId(mailId);

  const options = { upsert: false };

  const { modifiedCount } = await db
    .collection('users')
    .updateOne(
      { mail: { $elemMatch: { id: objectId } } },
      { $set: { 'mail.$.trashed': false } },
      options,
    );

  return modifiedCount === 1;
}

async function favorite(mailId) {
  const db = getDb();
  const objectId = ObjectId(mailId);

  const options = { upsert: false };

  const { modifiedCount } = await db
    .collection('users')
    .updateOne(
      { mail: { $elemMatch: { id: objectId } } },
      { $set: { 'mail.$.favorited': true } },
      options,
    );

  return modifiedCount === 1;
}

async function unfavorite(mailId) {
  const db = getDb();
  const objectId = ObjectId(mailId);

  const options = { upsert: false };

  const { modifiedCount } = await db
    .collection('users')
    .updateOne(
      { mail: { $elemMatch: { id: objectId } } },
      { $set: { 'mail.$.favorited': false } },
      options,
    );

  return modifiedCount === 1;
}

module.exports = { byID, markAsRead, trash, recover, favorite, unfavorite };
