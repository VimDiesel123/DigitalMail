const Router = require('express');
const mail = require('./mail');
const user = require('./user');
const signedUrls = require('./signed_url');

const router = new Router();

// Return all mail items for user.
router.get('/api/user/mail', async (req, res) => {
  // TODO: VERY IMPORTANT!!!!!!!!!! (David)
  // I need to add error handling with express to handle what happens if
  // the user isn't in the DB.

  const authenticatedUserID = req.auth.sub;
  const authenticatedUser = await user.byID(authenticatedUserID);

  if (!authenticatedUser) {
    return res.json({ pdfs: [] });
  }

  const mailWithUrls = await signedUrls.withSignedUrl(authenticatedUser.mail);

  return res.json({
    mail: mailWithUrls,
  });
});

// TODO: (David) Holy Camole this is bad!
// TODO: (David) also get rid of these console logs.

// Mark mail item as read or favorited:
router.patch('/api/user/mail/:id', async (req, res, next) => {
  const { id } = req.params;
  const { read, favorite } = req.query;

  if (read === 'true') {
    try {
      const markedAsRead = await mail.markAsRead(id);
      return markedAsRead
        ? res.status(200).send('Item read')
        : res.status(500).send('Failed to mark item as read');
    } catch (err) {
      return next(err);
    }
  }
  if (favorite === 'true') {
    try {
      const favorited = await mail.favorite(id);
      if (favorited) {
        console.info('\x1b[35m%s\x1b[0m', `Mail with id: ${req.params.id} favorited.`);
        return res.status(200).send('Mail item favorited.');
      }
      return res.status(500).send('Failed to favorite mail item');
    } catch (err) {
      return next(err);
    }
  } else if (favorite === 'false') {
    try {
      const unfavorited = await mail.unfavorite(id);
      if (unfavorited) {
        console.info('\x1b[34m%s\x1b[0m', `Mail with id: ${req.params.id} unfavorited.`);
        return res.status(200).send('Mail item unfavorited.');
      }
      return res.status(500).send('Failed to unfavorite mail item');
    } catch (err) {
      return next(err);
    }
  } else {
    return res.status(400).json({ error: 'Invalid query parameters' });
  }
});

// Send mail item to trash.
router.delete('/api/user/mail/:id', async (req, res, next) => {
  try {
    const trashed = await mail.trash(req.params.id);

    if (trashed) {
      console.info('\x1b[33m%s\x1b[0m', `Mail with id: ${req.params.id} sent to trash`);
      return res.status(200).send('Item sent to trash');
    }

    return res.status(500).send('Error moving mail to Trash.');
  } catch (err) {
    return next(err);
  }
});

// Recover mail item from trash.
router.put('/api/user/mail/:id', async (req, res, next) => {
  try {
    const recovered = await mail.recover(req.params.id);

    if (recovered) {
      console.info('\x1b[32m%s\x1b[0m', `Mail with id: ${req.params.id} removed from trash`);
      return res.status(200).send('Item removed from trash');
    }

    return res.status(500).send('Error moving mail out of Trash');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
