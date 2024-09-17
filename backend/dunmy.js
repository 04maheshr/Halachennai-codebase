const admin = require('firebase-admin');
 // Import required Firestore functions

// Initialize Firebase Admin SDK
const serviceAccount = require('./env/firebase servicekey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://halachennai-ecd86-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

// Define your products array
let popular_design = [
  {
    id: 1,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: "https://firebasestorage.googleapis.com/v0/b/halachennai-ecd86.appspot.com/o/popular_design%2Ftshirt1.jpeg?alt=media&token=d0893ed7-581a-4099-bc69-090a6e94b0ea",
    new_price: 50.0,
    old_price: 80.5,
  },
  {
    id: 2,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: "https://firebasestorage.googleapis.com/v0/b/halachennai-ecd86.appspot.com/o/popular_design%2Ftshirt2.jpeg?alt=media&token=3c5a8633-efaa-4253-b661-b8f425bed01a",
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 3,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: "https://firebasestorage.googleapis.com/v0/b/halachennai-ecd86.appspot.com/o/popular_design%2Ftshirt3.jpeg?alt=media&token=64825404-d2b2-4b58-8ccd-1f5d90454619",
    new_price: 60.0,
    old_price: 100.5,
  },
  {
    id: 4,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: "https://firebasestorage.googleapis.com/v0/b/halachennai-ecd86.appspot.com/o/popular_design%2Ftshirt4.jpeg?alt=media&token=bab8f32e-f0aa-4c20-b1a2-6e55b805868f",
    new_price: 100.0,
    old_price: 150.0,
  },
];


// Reference to your collection

// Upload each item
const uploadProducts = async () => {
    const productsRef = db.collection('popular_design'); // Use collection directly from the db instance
  
    for (const product of popular_design) {
      try {
        await productsRef.doc(product.id.toString()).set(product); // Use doc and set directly from the Firestore instance
        console.log(`Document with id ${product.id} written successfully`);
      } catch (error) {
        console.error('Error adding document:', error);
      }
    }
  };
  
  // Call the function to upload products
  uploadProducts();