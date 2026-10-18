var express = require('express');
var router =express.Router();
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

router.get('/display_all_includes',function(req,res,next){
    console.log("Fetch all includes hit")   
    pool.query('SELECT i.includeid,c.categoryname,s.subcategoryname,i.include,i.exclude FROM includes i INNER JOIN category c ON i.categoryid = c.categoryid INNER JOIN subcategory s ON i.subcategoryid = s.subcategoryid;',function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, data: result });
        }

    })
});

router.post("/delete_include",function(req,res,next){
    pool.query("delete from includes where includeid=?",[req.body.includeId],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{           
             res.status(200).json({ status: true, message: 'Include deleted successfully' });
        }
    })
})

router.get('/fetch_all_subcategory',function(req,res,next){
    console.log("Route hit")
    pool.query('select * from subcategory where categoryid = ?',[req.query.catid],function(error,result){
        console.log("Query executed",req.query.catid)
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, data: result });
            
        }
    })
});

router.post('/add_new_includes',function(req,res,next){
    pool.query('insert into includes(categoryid,subcategoryid,include,exclude) values(?,?,?,?)',[req.body.categoryid,req.body.subcategoryid,req.body.include,req.body.exclude],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, message: 'Includes added successfully' });
        }
    })
});

router.post("/edit_includes",function(req,res,next){
    pool.query("update includes set categoryid=?,subcategoryid=?,include=?,exclude=? where includeid=?",[req.body.categoryid,req.body.subcategoryid,req.body.include,req.body.exclude,req.body.Includeid],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
                res.status(200).json({ status: true, message: 'Include updated successfully' });
        }
    })
})


module.exports = router;