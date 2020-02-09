
var sql=require("mysql");
var express=require("express");
var session = require('express-session');
var bodyparser = require("body-parser") ;
var distancess = require('google-distance');
distancess.apiKey = 'AIzaSyBGMoVL1dNSndLLrViQ1dUvNchavQdfMFE';
var distance = require('google-distance-matrix');
distance.key('AIzaSyCOEu1FnrmJFzFO9UbB_E_EBNuSOiXFqDY');
var app=express();
var data ="" ;
var email="" ;
var username ="" ;
var fromm="";
var maxx =Number.MAX_SAFE_INTEGER ;
var count=0 ;
var pos ="" ;
var too ="" ;
var time ="" ;
var mintime ="" ;
app.set("view engine" ,"ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(session (
    {
        secret: 'secret',
        resave: true ,
        saveUninitialized: true
    }));



var connection = sql.createConnection(
{
	host:"localhost",
	user:"hrkhan",
	database:"Cab_Management_System" 
});

app.get("/",function(req,res){
    res.render("home1" ,{email : email ,username : username });
});







app.get("/both",function(req,res){
    res.render("loginboth");
});


app.get("/about",function(req,res){
    res.render("aboutus" ,{email : email ,username : username });
});

app.get("/registeruser",function(req,res){
    res.render("userregister");
});

app.get("/registerdriver",function(req,res){
    res.render("driverregister");
});

app.get("/login",function(req,res){
    res.render("loginpage");
});

app.get("/logout",function(req,res){
        
      req.logout();
    req.session.destroy(function(err)
    {
      
        if(err) throw err ;  
       email="";
        username="";
       
        res.redirect("/login");
    })
    res.render("loginpage");
});

app.get("/logindriver",function(req,res){
    res.render("loginpagedriver");
});


app.get("/bookcab",function(req,res){
    if(email)
    {
       res.render("distance",{email : email ,username : username}); 
    }
    else
    {
         res.redirect("/login");
    }
     
});

app.get("/forgetuser",function(req,res){
    res.render("forgetpassword");
});



app.get("/bill",function(req,res){
    res.render("billpayment" ,{email : email ,username : username });
});

app.post("/userregister" ,function(req ,res)
{
    var name = req.body.Name ;
    var email = req.body.Email ;
    var password = req.body.Password ;
    var mobileno = req.body.Number ;
     var data={customerEmailId:email,
    customer_name:name,
    mobile_no:mobileno,
    password:password
    } ;
    connection.query('INSERT INTO user SET ?',data,function(err,result){
        if(err) throw err;
    res.send("SUCCESS");
});

});


app.post("/driverregister" ,function(req ,res)
{
    var name = req.body.Name ;
    var email = req.body.Email ;
    var password = req.body.Password ;
    var mobileno = req.body.Number ;
    var bankaccount = req.body.Bankaccount ;
    var carno =req.body.Carno ;
    var cartype =req.body.Cartype ;
    var licenseno =req.body.Licenseno ;
    var data={driverEmailId:email,
    driver_name:name,
    driver_mobile_no:mobileno,
    driver_password:password ,
    license_No : licenseno ,
    bank_Account : bankaccount ,
    cab_type : cartype ,
    car_no : carno 
    } ;
    connection.query('INSERT INTO drivers SET ?',data,function(err,result){
        if(err) throw err;
    res.send("SUCCESS");
});

});



app.post("/loginsuccessdriver" ,function(req ,res)
{
        email= req.body.Email;
        var password = req.body.Password;
        var location = req.body.Location ;
        connection.query('SELECT * FROM drivers WHERE driverEmailId = ?',[email], function (error, results, fields) {
         if (error) {
                        res.send({
                          "code":400,
                          "failed":"error ocurred"
                        });
                    }
          else
            {
                         console.log('The solution is: ', results);
                if(results.length >0)
                {
                          if(results[0].driver_password == password)
                          {
                                      var name =results[0].driver_name ;
                                      var carno = results[0].car_no ;
                                      var cabtype = results[0].cab_type ;
                                      var  data={driverEmailId:email,
                                        location: location ,
                                        driver_name : name ,
                                        car_no : carno ,
                                        cab_type : cabtype
                                        } ;
                                       
                                connection.query('INSERT INTO cab_detail SET ?',data,function(err,result){
                                    if(err) throw err;
                                res.send("SUCCESS");
                            });
                             
            
                         }
                      else
                      {
                        res.send({
                          "code":204,
                          "success":"Email and password does not match"
                            });
                             res.redirect('/login'); 
                            
                      }
                }
                    else
                    {
                      res.send({
                        "code":204,
                        "success":"Email does not exits"
                          });
                    }
              }
            });

});




 app.post("/loginsuccess" ,function(req,res){
   email= req.body.Email;
  var password = req.body.Password;
  connection.query('SELECT * FROM user WHERE CustomerEmailId = ?',email, function (error, results, fields) {
  if (error) {
    // console.log("error ocurred 1",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    });
     res.redirect('/login'); 
  }
  else
  {
     //  console.log('The solution is: ', results);
    if(results.length >0)
    {
      if(results[0].password == password){
          req.session.loggedin =true ;
          req.session.email = email ;
          username =results[0].customer_name ;
            res.redirect('/'); 
      }
      else
      {
        res.send({
          "code":204,
          "success":"Email and password does not match"
            });
             res.redirect('/login'); 
            
      }
    }
    else
    {
      res.send({
        "code":204,
        "success":"Email does not exits"
          });
    }
  }
  });

 });


app.post("/passwordsuccess" ,function(req,res){
   email= req.body.Email;
  var password = req.body.Password;

   connection.query('UPDATE user  SET password= ? WHERE CustomerEmailId = ?' ,[password ,email ], function (error, results, fields) {
  if (error) {
    
   
     res.redirect('/forgetuser'); 
  }
  else
  {
   
            res.redirect('/login'); 
    }
  });
 });


 
 
 app.post("/cabbooking" ,function(req,res){
     
         fromm= req.body.From;
         too = req.body.To ;
       var bookingid ='bid_' + Math.random().toString(36).substr(2, 9) ;
       var  drivername ="" ;
        var drivermobileno ="";
        var cartype="" ;
        var carno = "" ;
        var usermobileno ="" ;
        var distancecover =-1;
        var  price = "" ;
       var  driverlocation= "" ;
         var destinations = [ ] ;
         distancess.get(
  {
    origin: fromm,
    destination: too
  },
  function(err, data) {
    if (err) return console.log(err);
    distancecover=data.distanceValue / 1000 ;
    price = distancecover * 8 ;
    console.log(" " ,distancecover ,price) ;
});

console.log(fromm ,too);

//  var dist =""  ;
//  var drivertime = "" ;
//  distance.mode('driving');
//  distance.units('imperial');
  var result = {} ;
// var destinations = [ ] ;
  connection.query('SELECT * FROM cab_detail' , function (error, results, fields) {
                 if (error) {
                        res.send({
                          "code":400,
                          "failed":"error ocurred"
                         });
                     }
                 else
                     {
                         result=results ;
                      }   
                 for (var i in results)             
                           {
                               destinations[i] = results[i].location ;
                           }       
                                  
 }) ;        
                                   
     

    
//       var data={booking_id:bookingid,
//                 customer_name:username,
//                 customer_email:email,
//                 customer_mobile_no : usermobileno ,
//                 driver_name:drivername,
//                 pick_up_location :fromm ,
//                 destination_location :too ,
//                 driver_location :driverlocation ,
//                 kilometer_to_travel :distancecover ,
//                 car_no :carno ,
//                 cab_type :cartype ,
//                 driver_mobile_no :drivermobileno ,
//                 cost_of_trip :price ,
//                 driver_time : drivertime
                
//     } ;
//     connection.query('INSERT INTO cab_booking SET ?',data,function(err,result){
//         if(err) throw err;
//          res.send("SUCCESS");
//         res.redirect('/bill');
   
// });
                 
       
// });

 



//  app.post("/distanceinfo" ,function(req,res){
//      console.log("distance");
     
//      var name = res.body.Distance ;
//     console.log("fff" , name);
//     res.send("Sucess your cab has been booked driver is on the way ") ;
    
 });

  









  app.post("/billpay" ,function(req,res){
   
 });
 



app.listen(8080,function(){
    console.log("CFC Server running on 8080");
});