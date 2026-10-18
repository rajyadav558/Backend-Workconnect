const express = require('express');
var router = express.Router();
var pool = require("./pool");


router.post('/check_user_mobileno', function(req, res, next) {

  pool.query("select * from users where mobileno=?",[req.body.phoneNumber],function(error,result){
   
    if(error){
      res.status(500).json({ status: false, message: 'Server Error' });
    }
    else{
      if(result.length > 0){
        res.status(200).json({ status: true, message: 'User found', data: result[0] });
      }
      else{
        res.status(200).json({ status: false, message: 'User not found',data: [] });
      }
    }
  })
});

router.post('/create_user', function(req, res, next) {

    console.log("CREATE USER ROUTE HIT");
    console.log("BODY:", req.body);

    pool.query(
        "insert into users (mobileno) values(?)",
        [req.body.mobileno],
        function(error, result) {

            console.log("ERROR:", error);
            console.log("RESULT:", result);

            if(error){
                return res.status(500).json({
                    status: false,
                    message: error.message
                });
            }

            return res.status(200).json({
                status: true,
                message: 'Success',
                data: {
                    id: result.insertId,
                    mobileno: req.body.mobileno
                }
            });
        }
    );
});

router.post('/add_new_address', function(req,res,next){
  console.log("ADD NEW ADDRESS ROUTE HIT",req.body);
  pool.query("insert into addresses(mobileno ,typeaddress, houseno, area, landmark, city, state, pincode, latitude, longitude, fulladdress) values(?,?,?,?,?,?,?,?,?,?,?)",[req.body.mobileno, req.body.typeaddress, req.body.houseno, req.body.area, req.body.landmark, req.body.city, req.body.state, req.body.pincode, req.body.latitude, req.body.longitude, req.body.fulladdress],function(error,result){
   
    if(error){
      res.status(500).json({ status: false, message: error.message });
    }
    else{
      res.status(200).json({ status: true, message: 'Address added successfully', data:result });
    }
  })
});

router.post('/fetch_all_address',function(req,res,next){
  console.log("FETCH ALL ADDRESS ROUTE HIT",req.body.mobileno);
  pool.query("select * from addresses where mobileno=?",[req.body.mobileno],function(error,result){
    console.log("ERROR Fetching Addresses:", error);
    console.log("RESULT:", result);
    if(error){
      
      res.status(500).json({ status: false, message: 'Server Error' });
    }
    else{
      res.status(200).json({ status: true, message: 'Success', data:result, id:result.insertId });
    }
})

});

router.post('/delete_address',function(req,res,next){
  pool.query("delete from addresses where addressid=?",[req.body.addressid],function(error,result){
    if(error){
      res.status(500).json({ status: false, message: 'Server Error' });
    }
    else{
      res.status(200).json({ status: true, message: 'Address deleted successfully', data:result });
    }
})
});

router.post('/address_edit',function(req,res,next){
  pool.query("update addresses set typeaddress=?, houseno=?, area=?, landmark=?, city=?, state=?, pincode=?, latitude=?, longitude=?, fulladdress=? where addressid=?",[req.body.typeaddress, req.body.houseno, req.body.area, req.body.landmark, req.body.city, req.body.state, req.body.pincode, req.body.latitude, req.body.longitude, req.body.fulladdress, req.body.addressid],function(error,result){
    if(error){
      res.status(500).json({ status: false, message: 'Server Error' });
    }
    else{
      res.status(200).json({ status: true, message: 'Address updated successfully', data:result });
    }
  })
})


module.exports = router;
