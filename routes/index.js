var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*GET Hello World page */
router.get('/helloworld', function(req,res) {
  res.render('helloworld', { title: 'Hello World!' })
});
/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});
/*GET New User Page. */
router.get('/newuser', function(req,res) {
	res.render('newuser', { title: 'Add New User' });
});
/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    req.assert('username', 'Name is required').notEmpty();           //vallidate name
    req.assert('mobile_number', 'Number is required').notEmpty()
    req.assert('mobile_number', 'Valid Number is required').isInt();           //Validate number
    req.assert('email', 'A valid email is required').isEmail();  //Validate email

    var errors = req.validationErrors();  
    if(errors){ 
        res.render('newuser', { 
            title: 'Add New User',
            message: '',
            errors: errors
        });
        //console.log(new Error().stack);
       
    }

    // Get our form values. These rely on the "name" attributes
    var Name = req.body.username;
    var Mobile_Number = req.body.mobile_number;
    var Email = req.body.email;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "name" : Name,
        "mobile_number" : Mobile_Number,
        "email" : Email
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

module.exports = router;
