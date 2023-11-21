const axios = require('axios');
// const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyBCZaKItU1xHKDPjehxZyNRxMBwYyw0vvU';

const getCoordsForAddress = async function (address) {
    // try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
        const data = response.data;

        if (!data || data.status === 'ZERO_RESULTS') {
            const error = new HttpError('Could not find location for the address.', 422);
            throw error;
        }

        const coordinates = data.results[0].geometry.location;
        return coordinates;
    // }
    //  catch (error) {
    //     throw new HttpError('Something went wrong, could not fetch location data.', 500);
    // }
};

module.exports = getCoordsForAddress;
