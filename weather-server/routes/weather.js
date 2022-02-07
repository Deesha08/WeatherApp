const express = require('express');
const router = express.Router();
const config = require('../config');
const axios = require('axios');
const nodeGeocoder = require('node-geocoder');





const getLatLong = async(cityName) => {
    const options = {
        provider: config.geoLocationProvider
    };
    const geoCoder = nodeGeocoder(options);
    const locationDetails = await geoCoder.geocode(cityName)
    return locationDetails

}


const getCity = async({lat, lon}) => {
    const options = {
        provider: config.geoLocationProvider
    };
    const geoCoder = nodeGeocoder(options);
    const response = await geoCoder.reverse({lat,lon})
    return response

}

const getWeatherDetails = (inputParams) => {
        let { lat, lon, units } = inputParams
        const apiURL = `${config.weatherAPP.baseUrl}/onecall?lat=${lat}&lon=${lon}&appid=${config.weatherAPP.APIkey}&units=${units}`;
        const response = axios.get(apiURL);
        return response;

    }
    /* GET weather by lat & long. */
router.get('/detailsByCity', async(req, res) => {
    const { city, units } = req.query
    let lat, lon;

    try {
        const locationDetails = await getLatLong(city)
        if (locationDetails.length == 0) {
            const errObj = { 'success': false, 'reason': 'City name not found' }
            res.send(errObj)
        } else {
            lat = locationDetails[0].latitude;
            lon = locationDetails[0].longitude
            const response = await getWeatherDetails({ lat, lon, units });
            const cityResponse = await getCity({ lat, lon});
            response.data.city=cityResponse[0].city;
            res.send(response.data);
        }
        
    } catch (error) {
        res.send(error)
    }

})

router.get('/detailsByLocation', async(req, res) => {
    const { lat, lon, units } = req.query
    try {
        const response = await getWeatherDetails({ lat, lon, units });
        const cityResponse = await getCity({ lat, lon});
        response.data.city=cityResponse[0].city
        res.send(response.data);
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})



module.exports = router;