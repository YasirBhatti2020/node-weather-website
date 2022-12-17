const request = require('postman-request')

const accessKey = '8e651c67874c5add1369c6cb200b9d96'
const weatherUrl = 'http://api.weatherstack.com/current'


const weather = (data, callback) => {
    const url = weatherUrl +'?access_key='+accessKey+'&query='+encodeURIComponent(data.latitude)+','+encodeURIComponent(data.longitude)

    request({url:url, json: true},(error, response)=>{
        if(error){
            callback('unable to connect to weather services')
        }
        else if(response.body.length === 0)
        {
            callback('unable to find location')
        }
        else
        {
            callback(undefined,{
                weatherdata: response.body.current
                }
            )
        }

    })
}



module.exports = {
    weather : weather
}

