const express = require('express');
const { 
    createProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Route to create a new product
router.post('/', upload.single('image'), createProduct);

// Route to get all products
router.get('/', getAllProducts);

// Route to get a product by ID
router.get('/:id', getProductById);

// Route to update a product by ID
router.put('/:id', upload.single('image'), updateProduct);

// Route to delete a product by ID
router.delete('/:id', deleteProduct);

module.exports = router;