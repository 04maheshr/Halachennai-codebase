var admin = require("firebase-admin");
require('dotenv').config();
var serviceAccount = require("../env/firebase servicekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});
const db = admin.firestore();
db.collection('users').get()
  .then(snapshot => {
    console.log('Firestore is connected');
  })
  .catch(error => {
    console.error('Error connecting to Firestore:', error);
  });

module.exports = { db };

