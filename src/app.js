const express = require ('express')
require ('./db/conn')
const app = express()
const PORT = process.env.PORT || 4502
const path = require ('path')
const hbs = require ('hbs')



//Middlewares

const static_path = path.join(__dirname, "../public")
app.use (express.static(static_path))
app.use('/css',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/css')))

// /View engine

// (PATH)
const templatePath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


app.set('view engine', 'hbs')
app.set('views',templatePath)
hbs.registerPartials(partialsPath)

// Routing
app.get('/',(req,res)=>{

    res.render('index')
})

app.get('/contact',(req,res)=>{
    res.render('contact')
})



// PORT
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})
