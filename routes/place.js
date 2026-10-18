var express = require('express');
var router = express.Router();
var pool = require('./pool');

router.post('/add_new_place', function(req, res, next) {
    console.log("BODY:", req.body);
    pool.query(
        'INSERT INTO places(cityid,placename,pincode) VALUES(?,?,?)',
        [req.body.cityid, req.body.placeName, req.body.pincode],
        function(error, result) {
            if (error) {
                console.log("Error:", error);
                res.status(500).json({ status: false, message: 'Server Error' });
            } else {
                res.status(200).json({ status: true, message: 'Place added successfully' });
            }
        }
    );
});

router.get('/display_all_places',function(req,res,next){
    pool.query('select * from places',function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, data: result });
        }
})
});

router.post('/edit_place',function(req,res,next){
    pool.query('update places set cityid=?,placename=?,pincode=? where placeid=?',[req.body.Cityid,req.body.Placename,req.body.Pincode,req.body.Placeid],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, message: 'Place updated successfully' });
        }
})
});

router.post('/delete_place',function(req,res,next){
    pool.query('delete from places where placeid=?',[req.body.placeId],function(error,result){
        if(error){
            console.log("Error:",error);
            res.status(500).json({ status: false, message: 'Server Error' });
        }
        else{
            res.status(200).json({ status: true, message: 'Place deleted successfully' });
        }
    })
});
module.exports = router;