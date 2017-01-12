const express= require('express') ; 
const hbs = require('hbs'); 
const fs= require('fs') ; 



var app = express(); 

hbs.registerPartials(__dirname + '/views/partials'); 
app.set('view engine', 'hbs') ; 


app.use((req,res,next)=>{
    console.log('middleware 1....') ; 
    var now = new Date().toString();
    var log =`${now} :${req.method} ${req.url}`
    console.log(log ); 
    fs.appendFile('server.log', log + '\n') ; 
    next(); 
})

app.use((req, res, next)=>{
    res.render('maintenance.hbs') ; 
})
app.use(express.static(__dirname + '/public')); 

hbs.registerHelper('getCurrentYear', ()=>new Date().getFullYear() ) ; 
hbs.registerHelper('screamIt', (msg)=> msg.toUpperCase()); 

//register a handler
app.get('/', (req, res)=>{
    //res.send("<h1>Hello Express</h1>") ; 

   res.render('home.hbs', {
       pageTitle :' Home Page', 
       welcomeMessage : ' Welcome to my website'
   })
}); 
 
app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle : 'About Page for Handle Bars'
    }) ; 
}); 


app.listen(9191, ()=>{
    console.log("Server is up on Port:" + 9191) ;
}) ; 