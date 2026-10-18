var express = require('express');
var router = express.Router();
var upload =require('./multer');
var pool = require('./pool');

/* GET users listing. */
router.post('/add_new_city',upload.single('cityicon'), function(req, res, next) {
  console.log(req.body);
  console.log(__dirname);
  pool.query('insert into city(cityname,cityicon) values(?,?)',[req.body.cityname,req.file.filename],function(error,result){

    if(error){
        res.status(500).json({status:false,message:'Server Error'
        })
        console.log("er",error);
    }else{
        res.status(200).json({status:true,message:'City added successfully'
        })

    }
  }
  )});
  
  router.get('/fetch_all_city', function(req, res, next) {
    pool.query('select * from city',function(error, result){
      if(error){
        res.status(500).json({status:false,message:'Server Error'
        })
        console.log("er",error);  
      }else{
        res.status(200).json({status:true,data:result})
      }
    })

  })

   router.post('/city_edit', function(req, res, next) {
  console.log(req.body);
  console.log(__dirname);
  pool.query('update city set cityname = ? where cityid = ?',[req.body.cityname,req.body.cityid],function(error,result){

    if(error){
        res.status(500).json({status:false,message:'Server Error'
        })
        console.log("er",error);
    }else{
        res.status(200).json({status:true,message:'City Edited successfully'
        })

    }
  }
  )});

   router.post('/delete_city', function(req, res, next) {
  console.log(req.body);
  console.log(__dirname);
  pool.query('delete from city where cityid = ?',[req.body.cityid],function(error,result){

    if(error){
        res.status(500).json({status:false,message:'Server Error'
        })
        console.log("er",error);
    }else{
        res.status(200).json({status:true,message:'City deleted successfully'
        })

    }
  }
  )});


   router.post('/edit_cityicon',upload.single('cityicon'), function(req, res, next) {
  console.log("Kuch aya ya nhi",req.body);
  console.log(__dirname);
  pool.query('update city set cityicon = ? where cityid = ?',[req.file.filename,req.body.cityid],function(error,result){

    if(error){
        res.status(500).json({status:false,message:'Server Error'
        })
        console.log("er",error);
    }else{
        res.status(200).json({status:true,message:'City Icon Edited successfully'
        })

    }
  }
  )});

  

module.exports = router;