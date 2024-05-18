const Product = require('../models/Product');
const Upload = require('../helpers/upload');

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, color, variety, price } = req.body;
        let imageUrl = null;
        
        if (req.file) {
            const upload = await Upload.uploadFile(req.file.path);
            if (!upload || !upload.secure_url) {
                return res.status(400).json({ success: false, msg: 'Upload process failed or no secure_url returned' });
            }
            imageUrl = upload.secure_url;
        }

        const newProduct = new Product({ name, color, variety, price, image: imageUrl });
        const savedProduct = await newProduct.save();
        res.status(201).json({ success: true, data: savedProduct });
    } catch (error) {
         res.status(400).json({ success: false, msg: error.message });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

// Get a product by name
const getProductByName = async (req, res) => {
    try {
        const product = await Product.findOne({ name: req.params.name });
        if (!product) {
            return res.status(404).json({ success: false, msg: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

// Update a product by name
const updateProductByName = async (req, res) => {
    try {
        const updatedData = req.body;

        if (req.file) {
            const upload = await Upload.uploadFile(req.file.path);
            if (!upload || !upload.secure_url) {
                return res.status(400).json({ success: false, msg: 'Upload process failed or no secure_url returned' });
            }
            updatedData.image = upload.secure_url;
        }

        const updatedProduct = await Product.findOneAndUpdate({ name: req.params.name }, updatedData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, msg: 'Product not found' });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, msg: 'Product not found' });
        }
        res.status(200).json({ success: true, msg: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductByName,
    updateProductByName,
    deleteProduct
};
