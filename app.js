const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
//const client = require("mailchimp-marketing");
const client = require('@mailchimp/mailchimp_marketing');


const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

client.setConfig({
    apiKey: "8c18a5eba80235a7c9c93a1ea3d1dd1c-us7",
    server: "us7",
  });

  

app.get("/", function(req,res){
   res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
    firstName=req.body.fName;
    lastdName=req.body.lName;
    email=req.body.email;
    const run = async () => {
      const response = await client.lists.batchListMembers("6a0bd17a7b", {
        members: [{email_address:email,status:"subscribed",merge_fields:{FNAME:firstName,LNAME:lastdName}}],
      });
      console.log(response);
    };
    
    run();

})

// request(options,function(err,response,body){

// })

// var options={

// }



app.listen(3000, function(){
    console.log("Server started at port 3000");
})

//8c18a5eba80235a7c9c93a1ea3d1dd1c-us7
//6a0bd17a7b