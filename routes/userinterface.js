var express = require('express');
var router = express.Router();
var pool = require('./pool');

router.get('/fetch_all_category',function(req,res,next){
    console.log("Fetch all category hit")
    pool.query('select * from category',function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, data: result });
        }
    })
});

router.post('/fetch_all_subcategory_by_categoryid',function(req,res,next){
    console.log("categoryid",req.body)
    pool.query("select * from subcategory where categoryid=?",[req.body.categoryid],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, data: result });
        }   
    })
})

router.post("/fetch_all_pricing",function(req,res,next){
    console.log("Body",req.body)
    pool.query("select pricing.*,subcategory.* from pricing ,subcategory where pricing.subcategoryid=subcategory.subcategoryid and pricing.subcategoryid=?",[req.body.Subcategoryid],function(error,result){
        console.log("result",result)
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, data: result });
        }
        })
    })

module.exports = router;