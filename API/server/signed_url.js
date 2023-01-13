require('dotenv').config();
const { Storage } = require('@google-cloud/storage');

async function withSignedUrl(mail) {
  // const keyFileName = process.env.GOOGLE_CLOUD_STORAGE_KEY_FILE;

  // console.log(keyFileName);

  const storage = new Storage(/* { keyFileName } */);

  const mailWithSignedUrls = await Promise.all(
    mail.map(async (mailItem) => {
      const options = {
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60, // 1 hour
      };

      const [signedUrl] = await storage
        .bucket('digital_main_test_bucket')
        .file(mailItem.path)
        .getSignedUrl(options);

      return { ...mailItem, signedUrl };
    }),
  );

  return mailWithSignedUrls;
}

module.exports = { withSignedUrl };
