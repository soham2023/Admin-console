const express = require("express");
const router = express.Router();

const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const productController = require('../controllers/productController');

router.use(bodyParser.urlencoded({ extended:true }));
router.use(express.static(path.resolve(__dirname,'public')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

router.get('/getproducts', productController.getProducts);
router.get('/getproducts/:id', productController.getProductById);
router.post('/createproducts', productController.createProduct);
router.put('/updateproducts/:id', productController.updateProduct);
router.delete('/deleteproducts/:id', productController.deleteProduct);

module.exports = router;
