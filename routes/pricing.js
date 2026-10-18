const express = require('express');
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/add_new_pricing",upload.single("Priceicon"),function(req,res,next){
    pool.query("insert into pricing(categoryid,subcategoryid,typeofservices,amount,offer,time_services,picture,description,no_of_acs) values(?,?,?,?,?,?,?,?,?)",[req.body.Categoryid,req.body.Subcategoryid,req.body.Tos,req.body.Amount,req.body.Offer,req.body.Timeservice,req.file.filename,req.body.Description,req.body.numberofacs],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, message: 'Pricing added successfully' });
        }
    })
})





module.exports = router;