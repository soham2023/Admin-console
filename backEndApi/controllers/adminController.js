const Store = require('../models/Store');
const Upload = require("../helpers/upload");

// Create a new store record
const createRecord = async (req, res) => {
    try {
        const upload = await Upload.uploadFile(req.file.path);
        
        if (!upload || !upload.secure_url) {
            return res.status(400).json({ success: false, msg: 'Upload process failed or no secure_url returned' });
        }
        
        const store = new Store({
            file_url: upload.secure_url
        });
        
        const newRecord = await store.save();
        res.status(201).json({ success: true, msg: 'File Uploaded Successfully!', data: newRecord });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

// Read all store records
const getAllRecords = async (req, res) => {
    try {
        const records = await Store.find({});
        res.status(200).json({ success: true, data: records });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

// Read a specific store record by ID
const getRecordById = async (req, res) => {
    try {
        const record = await Store.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ success: false, msg: 'Record not found' });
        }
        res.status(200).json({ success: true, data: record });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

// Update a store record by ID
const updateRecord = async (req, res) => {
    try {
        const updatedRecord = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecord) {
            return res.status(404).json({ success: false, msg: 'Record not found' });
        }
        res.status(200).json({ success: true, data: updatedRecord });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

// Delete a store record by ID
const deleteRecord = async (req, res) => {
    try {
        const deletedRecord = await Store.findByIdAndDelete(req.params.id);
        if (!deletedRecord) {
            return res.status(404).json({ success: false, msg: 'Record not found' });
        }
        res.status(200).json({ success: true, msg: 'Record deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

module.exports = {
    createRecord,
    getAllRecords,
    getRecordById,
    updateRecord,
    deleteRecord
};
