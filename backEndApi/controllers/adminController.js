const Store = require('../models/Store');
const Upload = require("../helpers/upload");

const uploadFile = async (req, res) => {
    try {
        const upload = await Upload.uploadFile(req.file.path);
        
        // Check if upload is defined before accessing its properties
        if (upload && upload.secure_url) {
            var store = new Store({
                file_url: upload.secure_url
            });
            var record = await store.save();
            res.send({ success: true, msg: 'File Uploaded Successfully!', data: record });
        } else {
            // Handle case where upload is undefined or doesn't contain secure_url
            res.send({ success: false, msg: 'Upload process failed or no secure_url returned' });
        }
    } catch (error) {
        res.send({ success: false, msg: error.message });
    }
}

module.exports = {
    uploadFile
}
