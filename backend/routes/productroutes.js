const express = require('express');
const ProductModel = require('../models/productmodel');

const router = express.Router();


router.get('/products', async (req, res) => {
  try {
    const data = await ProductModel.fetchAndSaveProducts();
    
    // Structure the response with different names
    const responseData = {
      productsList: data.all_products,
      collections: data.new_collections,
      popularItems: data.popular_design,
    };
    
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
