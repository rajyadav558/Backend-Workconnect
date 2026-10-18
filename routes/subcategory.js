var express = require ('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

router.post('/add_new_subcategory',upload.single('subicon'),function(req,res,next){
    pool.query('insert into subcategory(categoryid,subcategoryname,subicon) values(?,?,?)',[req.body.Categoryid,req.body.Subcategoryname,req.file.filename],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, message: 'Subcategory added successfully' });
        }   
}) });

router.get('/fetch_all_subcategory',function(req,res,next){
    console.log("Route hit")
    pool.query('select * from subcategory',function(error,result){
        
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, data: result });
            
        }
    })
});


router.post('/delete_subcategory',function(req,res,next){  {
    pool.query('delete from subcategory where subcategoryid=?',[req.body.subcategoryId],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, message: 'Subcategory deleted successfully' });
        }   })
}})

router.post('/subcategory_edit',function(req,res,next){
    pool.query('update subcategory set subcategoryname=? where subcategoryid=?',[req.body.Subcategoryname,req.body.Subcategoryid],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }   
        else{
            res.status(200).json({ status: true, message: 'Subcategory updated successfully' });
        }   
    })
})

router.post('/edit_subicon',upload.single('subicon'),function(req,res,next){
    pool.query('update subcategory set subicon=? where subcategoryid=?',[req.file.filename,req.body.Subcategoryid],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }   
        else{
            res.status(200).json({ status: true, message: 'Subcategory icon updated successfully' });
        }
})
})
module.exports = router;