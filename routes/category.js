var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

router.post('/add_new_category',upload.single('categoryicon'),function(req,res,next){
    pool.query('insert into category(categoryname,categoryicon) values(?,?)',[req.body.Categoryname,req.file.filename],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, message: 'Category added successfully' });
        }           
})
});

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

router.post('/delete_category',function(req,res,next){
    pool.query('delete from category where categoryid=?',[req.body.categoryId],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, message: 'Category deleted successfully' });
        }       
})
});

router.post('/edit_category',function(req,res,next){
    pool.query('update category set categoryname=? where categoryid=?',[req.body.categoryname,req.body.categoryid],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, message: 'Category updated successfully' });
        }
    })
});

router.post('/edit_categoryicon',upload.single('categoryicon'),function(req,res,next){
    pool.query('update category set categoryicon=? where categoryid=?',[req.file.filename,req.body.Categoryid],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, message: 'Category icon updated successfully' });
        }
    })
});
module.exports = router;