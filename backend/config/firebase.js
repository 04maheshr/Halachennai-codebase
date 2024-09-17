var admin = require("firebase-admin");

var serviceAccount = require("../env/firebase servicekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://halachennai-ecd86-default-rtdb.firebaseio.com"
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

