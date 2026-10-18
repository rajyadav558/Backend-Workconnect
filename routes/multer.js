// console.log(__dirname);
// var multer=require('multer');
// const { v4: uuidv4 }=require('uuid');
// var diskSetting=multer.diskStorage({
//     destination:(req,file,path)=>{
//         path(__dirname,'../public/images');
//     },
//     filename:(req,file,path)=>{
//         var filename= uuidv4()+file.originalname.substring(file.originalname.lastIndexOf("."))
//         path(null,filename);
//     }
// })
// var upload=multer({storage:diskSetting});
// module.exports=upload;

var multer = require('multer');
const { v4: uuidv4 } = require('uuid');
var path = require('path');
var fs = require('fs');

console.log("__dirname:", __dirname);

var diskSetting = multer.diskStorage({

    destination: (req, file, cb) => {
        // correct path banega
        var dir = path.join(__dirname, '../public/images');

        console.log("Final Path:", dir);

        // folder create karega agar nahi hai
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);   // ✅ correct usage
    },

    filename: (req, file, cb) => {
        var ext = file.originalname.substring(file.originalname.lastIndexOf("."));
        var filename = uuidv4() + ext;
        cb(null, filename);
    }

});

var upload = multer({ storage: diskSetting });

module.exports = upload;