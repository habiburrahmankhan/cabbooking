
var sql=require("mysql");
var express=require("express");
var app=express();



var connection = sql.createConnection(
{
	host:"localhost"
	user:"habiburrahmankhan" ,
	database:"Cab_management_system" 
});


app.get("/",function(req,res){
    res.send("Welcome to CFC!!!");
});






















app.listen(8080,function(){
    console.log("CFC Server running on 8080");
});