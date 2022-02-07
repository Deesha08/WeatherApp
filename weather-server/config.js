module.exports = {
    weatherAPP: {
        baseUrl: 'https://api.openweathermap.org/data/2.5',
        APIkey: '21b074af8e5532288825361ec69cfec1',
    },
        geoLocationProvider: 'openstreetmap',
        dynamoDB:{
            requestsTrackerTable: 'weather-app-requests-tracker'

        }
    
};