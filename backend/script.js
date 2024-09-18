require('dotenv').config({ path: './env/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const razorpayRoutes = require('./routes/razorpayroute');
const productRoutes = require('./routes/productroutes');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());


app.use('/api', razorpayRoutes);
app.use('/api', productRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
