const cloudinary = require('cloudinary');
const fs = require('fs'); // Importing the 'fs' module for file system operations

const User = require('../model/productModel');
const AppError = require('../utils/appError'); // Importing custom error handler

const createUser = async (req, res, next) => { // Added 'next' parameter for error handling
    try {
        const { name, variety, price, color } = req.body;

        // Validate if all required fields are present
        if (!name || !variety || !price || !color) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create a new user
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

        // Save the user to the database
        if (!newUser) {
            return next(new AppError('User registration failed, please try again later', 400));
        }

        // Upload file to Cloudinary
        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms',
                    width: 250,
                    height: 250,
                    gravity: 'faces',
                    crop: 'fill',
                });
                if (result) {
                    // Update user's avatar details
                    newUser.avatar.public_id = result.public_id;
                    newUser.avatar.secure_url = result.secure_url;

                    // Remove the file from local storage after successful upload
                    fs.unlinkSync(req.file.path);
                }
            } catch (error) {
                return next(new AppError(error.message || 'File not uploaded, please try again', 400));
            }
        }

        // Save the updated user to the database
        await newUser.save();

        // Return success response
        return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        // Handle errors
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createUser };