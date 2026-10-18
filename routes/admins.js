const express = require('express');
var router = express.Router();
var pool = require('./pool');

router.post('/chk_admin_password',function(req,res,next){
    pool.query('select * from admins where (emailid=? or mobileno=?) and password=?',[req.body.email,req.body.mobileno,req.body.password],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            if(result.length==1){
                res.status(200).json({ status: true, data: result[0] });
            }
            else{
                res.status(200).json({ status: false, message: 'Invalid emailid/mobileno or password' });
            }
        }
    });
})

module.exports = router;