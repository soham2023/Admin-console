const cloudinary = require('cloudinary');
const fs = require('fs');
const User = require('../model/productModel');
const AppError = require('../utils/appError');

const createUser = async (req, res, next) => {
    try {
        // Destructure request body
        const { name, variety, price, color } = req.body;

        // Validate required fields
        if (!name || !variety || !price || !color) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create new user
        const newUser = await User.create({
            name,
            variety,
            price,
            color,
            avatar: {
                public_id: name,
                secure_url: 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg',
            },
        });

        // If file exists, upload to Cloudinary
        if (req.file) {
            const result = await uploadToCloudinary(req.file.path);
            if (!result) {
                throw new AppError('File not uploaded, please try again', 400);
            }
            // Update user's avatar details
            newUser.avatar.public_id = result.public_id;
            newUser.avatar.secure_url = result.secure_url;

            // Remove file from local storage after successful upload
            fs.unlinkSync(req.file.path);
        }

        // Save updated user to the database
        await newUser.save();

        // Return success response
        return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        // Pass errors to error handling middleware
        return next(error);
    }
};

// Function to upload file to Cloudinary
const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath, {
            folder: 'lms',
            width: 250,
            height: 250,
            gravity: 'faces',
            crop: 'fill',
        });
        return result;
    } catch (error) {
        throw new Error(error.message || 'File not uploaded, please try again');
    }
};

module.exports = { createUser };