const { db } = require('../config/firebase');
const path = require('path');
const fs = require('fs');

class ProductModel {
  static async fetchAndSaveProducts() {
    try {
      const productsRef = db.collection('products');
      const newCollectionsRef = db.collection('new_collections');
      const popular_designRef=db.collection('popular_design')

      // Fetch data from 'products' collection
      const productsSnapshot = await productsRef.get();
      if (productsSnapshot.empty) {
        throw new Error('No products found');
      }
      const all_products = [];
      productsSnapshot.forEach(doc => {
        all_products.push(doc.data());
      });

      // Fetch data from 'new_collections' collection
      const newCollectionsSnapshot = await newCollectionsRef.get();
      if (newCollectionsSnapshot.empty) {
        throw new Error('No new collections found');
      }
      const new_collections = [];
      newCollectionsSnapshot.forEach(doc => {
        new_collections.push(doc.data());
      });
      const popular_designSnapshot = await popular_designRef.get();
      if (popular_designSnapshot.empty) {
        throw new Error('No products found');
      }
      const popular_design = [];
      popular_designSnapshot.forEach(doc => {
        popular_design.push(doc.data());
      });

      const dataToSave = {
        all_products,
        new_collections,
        popular_design,
      };

      return dataToSave;
    } catch (error) {
      console.error('Error fetching and saving products:', error);
      throw error;
    }
  }
}

module.exports = ProductModel;
