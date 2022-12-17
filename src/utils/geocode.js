
const request = require('postman-request')

const geoAccessKey = '4ef89247a99e5e044921849485795a06'
const geoUrl = 'http://api.positionstack.com/v1/forward'

const geocode = (address, callback) => {
    const url = geoUrl +'?access_key='+geoAccessKey+'&query='+encodeURIComponent(address)

    request({url:url, json: true},(error, response)=>{

        console.log(response.body)
        if(error){
            callback('unable to connect to location services')
        }
        else if(response.body.data.length === 0)
        {
            callback('unable to find location')
        }
        else
        {
            callback(undefined,{
                latitude: response.body.data[0].latitude,
                longitude: response.body.data[0].longitude,
                location: response.body.data[0].locality
                }
            )
        }

    })
}


module.exports = {
    geocode : geocode
}