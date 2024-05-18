var User = require('../models/User');
var csv = require('csvtojson');

const CsvParser = require('json2csv').Parser;

const users = async(req,res)=>{
    try{

        var userData = await User.find({});

        res.send({status:200, success:true, data:userData});

    }catch(error){
        res.send({status:400, success:false, msg:error.message});
    }
}

const importUser = async(req,res)=>{

    try {

        var userData = [];

        csv()
        .fromFile(req.file.path)
        .then(async(response) => {
            console.log(response);
            for(var x = 0; x < response.length; x++){
                userData.push({
                    name: response[x].Name,
                    email: response[x].Email,
                    mobile: response[x].Mobile,
                });
            }

            await User.insertMany(userData);

        });
        
        res.send({status:200, success:true, msg:'Users Imported Successfully!'});

    } catch (error) {
        res.send({status:400, success:false, msg:error.message});
    }

}

const exportUser = async(req,res)=>{
    try{

        let users = [];

        var userData = await User.find({});

        userData.forEach((user) =>{
            const { id, name, email, mobile } = user; 
            users.push({ id, name, email, mobile });
        });

        const json2csvParser = new CsvParser();
        const csv = json2csvParser.parse(users);

        res.setHeader('Content-Type', 'application/octet-stream');
        res.attachment("Users.csv");

        res.status(200).send(csv);

    }catch(error){
        res.send({status:400, success:false, msg:error.message});
    }
}

module.exports = {
    importUser,
    exportUser,
    users
}