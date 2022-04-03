var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        var random = Math.random();
        cb(null, random + Date.now() + file.originalname);

    },
});

var upload = multer({
    storage: storage, limit: {
        fileSize: 2 * 1024
    }
}).single('avatar');

var upload2 = multer({
    storage: storage,
    limit: {
        fileSize: 2 * 1024
    }
}).array('avatar',5);

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
// router.post('/profile', upload.single('avatar'), function (req, res, next) {
//     res.render('index', {title: 'Upload',message:"Thành công"});
// });
router.post('/profile', function (req, res, next) {
    upload2(req, res, function (err) {
        if (err) {
            res.render('index', {
                title: err.message
            });
        } else {
            res.render('index', {
                title: 'Upload thành công!!!!,',message:'Thành công'
            });
        }
    })
});
module.exports = router;

