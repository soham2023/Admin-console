const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        const { name, color, variety, price } = req.body;
        const image = req.file ? req.file.path : null;
        const newProduct = new Product({ name, color, variety, price, image });
        const savedProduct = await newProduct.save();
        res.status(201).json({ success: true, data: savedProduct });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

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

const updateProductByName = async (req, res) => {
    try {
        const updatedData = req.body;
        if (req.file) {
            updatedData.image = req.file.path;
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
