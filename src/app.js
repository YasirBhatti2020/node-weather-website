const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

// Define paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials') 

const app = express()
const port = process.env.PORT || 3000

// setup handlebar engines and views locations
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather Update',
        name: 'Yasir'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Yasir'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        msg: 'This is the help page',
        name: 'Yasir',
        title: 'Help'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    if(req.query.address.length <= 3){
        return res.send({
            error: 'Address must be greater than 3 characters'
        })
    }
    
    geocode.geocode(req.query.address, (error, data)=>{
        console.log('Error', error)
        console.log('Data',data)

        weather.weather(data, (error, data)=>{
        console.log('Error', error)
        console.log('Data',data)

            res.send({
                weatherdata: data.weatherdata,
                address: req.query.address
            })
        })
    })

})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products:[]
    })
    
})

app.get('*', (req, res) =>{
    res.send('My 404 page')
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})