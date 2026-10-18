var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

router.post('/add_new_expert',upload.any(),function(req,res,next){
    console.log("Route hit",req.body,req.files)
    pool.query('insert into experts (categoryid,subcategoryid,firstname,lastname,fathername,dob,emailid,mobileno,gender,curraddress,currcity,currstate,currpincode,peraddress,percity,perstate,perpincode,aadharid,uploadaadhar,panid,uploadpan,photograph,vechileno,license,uploadlicense,vechiletype) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [req.body.categoryid,req.body.subcategoryid,req.body.firstname,req.body.lastname,req.body.fathername,req.body.dob,req.body.email,req.body.mobile,req.body.gender,req.body.curraddress,req.body.currcity,req.body.currstate,req.body.currpincode,req.body.peraddress,req.body.percity,req.body.perstate,req.body.perpincode,req.body.adharno,req.files[0].filename,req.body.pancardno,req.files[1].filename,req.files[2].filename,req.body.vechileno,req.body.licenseno,req.files[3].filename,req.body.vechiletype],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, message: 'Expert Added Successfully' });
        }
    })
});

router.post('/delete_expert',function(req,res,next){
    console.log("Route hit",req.body)
    pool.query('delete from experts where expertid = ?',[req.body.expertid],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, message: 'Expert Deleted Successfully' });
        }
    })
});

router.post(
  '/edit_expert_image',
  upload.single('image'),
  function(req,res,next){

    console.log("Route hit");
    console.log(req.body);
    console.log(req.file);

    if(!req.file){

      return res.json({
        status:false,
        message:"No File Uploaded"
      });
    }

    var expertid = req.body.expertid;
    var imagename = req.body.imagename;

    var filename = req.file.filename;

    var query="";
    var values=[];

    if(imagename=="uploadaadhar"){

      query="update experts set uploadaadhar=? where expertid=?";
      values=[filename,expertid];
    }

    else if(imagename=="uploadpan"){

      query="update experts set uploadpan=? where expertid=?";
      values=[filename,expertid];
    }

    else if(imagename=="photograph"){

      query="update experts set photograph=? where expertid=?";
      values=[filename,expertid];
    }

    else if(imagename=="uploadlicense"){

      query="update experts set uploadlicense=? where expertid=?";
      values=[filename,expertid];
    }

    else{

      return res.status(400).json({
        status:false,
        message:"Invalid Image Name"
      });
    }

    pool.query(query,values,function(error,result){

      if(error){

        console.log(error);

        return res.status(500).json({
          status:false,
          message:'Server Error'
        });
      }

      else{

        return res.status(200).json({
          status:true,
          message:'Image Updated Successfully'
        });
      }
    })
});



router.post('/expert_edit',function(req,res,next){
    pool.query('update experts set firstname=?,lastname=?,mobileno=? where expertid=?',[req.body.firstname,req.body.lastname,req.body.mobileno,req.body.expertid],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, message: 'Expert Updated Successfully' });
        }
    })
});

router.get('/fetch_all_expert',function(req,res,next){
    console.log("Fetch all expert hit")
    pool.query('SELECT e.*,c.categoryname,s.subcategoryname FROM experts e INNER JOIN category c ON e.categoryid = c.categoryid INNER JOIN subcategory s ON e.subcategoryid = s.subcategoryid;',function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, data: result });
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

router.get('/fetch_all_state',function(req,res,next){
    console.log("Fetch all state hit")   
    pool.query('select * from expertstate',function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, data: result });
        }
    })
});

router.get('/fetch_all_city',function(req,res,next){
    console.log("Fetch all city hit")
    pool.query('select * from expertcity where stateid = ?',[req.query.Stateid],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, data: result });
        }
    })
});
module.exports = router;