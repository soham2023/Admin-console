const productModel = require('../Model/productModel')
const upload = require('../middleware/upload')

/*----------------------------------
Create Data
-------------------------------------*/

const createData = async (req, res, next) => {
    const { name, verity, price, color } = req.body;

    try {
        if (!name || !verity || !price || !color) {
            return res.status(400).json({
                success: false,
                message: 'Please Fill All Fields',
            });
        }

        const product = new productModel({
            name,
            verity,
            price,
            color, 
            //image: req.file ? req.file.path:null,
        });

        await product.save();

        return res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: `Product already exists with provided details`,
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
/*----------------------------------
Get Data
-------------------------------------*/
const getData = async (req, res, next) => {
    try {
        const products = await productModel.find().populate('image');
        return res.status(200).json({
            success: true,
            message: 'Products retrieved successfully',
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
/*----------------------------------
Update Data
-------------------------------------*/
const updateData = async (req, res, next) => {
    const { productName } = req.params;
    const { name, verity, price, color } = req.body;

    try {
        const updatedProduct = await productModel.findOneAndUpdate(
            { name: productName },
            {
                name,
                verity,
                price,
                color,
                //image: req.file ? req.file.path : null, 
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: updatedProduct
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

/*----------------------------------
delete Data
-------------------------------------*/
const deleteData = async (req, res) => {
    try {
        const deletedData = await productModel.findOneAndDelete({ name: req.params.productName });

        if (!deletedData) {
            throw new Error("Data not found");
        }

        res.status(200).json({
            success: true,
            message: 'Data deleted successfully',
            data: deletedData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createData,
    getData,
    updateData,
    deleteData,
}