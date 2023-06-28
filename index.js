//script for the home page and all other linking to other pages.
//code starts here:
const express = require('express')
const router = express.Router();
const path = require('path');
const app = express()
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/views')));
app.use(express.static(path.join(__dirname, '/')));
app.use('/', router);

router.get("/",function(req,res){
    res.sendFile(path.join(__dirname+'/views/index.html'));
  });
   
router.get("/calendar",function(req,res){
    res.sendFile(path.join(__dirname+'/views/calendar.html'));
  });
   
router.get("/todo",function(req,res){
    res.sendFile(path.join(__dirname+'/views/todo.html'));
  });
   

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

