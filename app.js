const express = require('express');
const axios = require('axios');
const moment = require('moment');
const app = express();
const cors = require('cors');
const { query } = require('express');

app.use(cors());

app.get('/api/v1/exchangeRates/:currencyCode', async (req, res, next) => {
    try{
        const Date = moment().subtract(1, 'days').format('YYYY-MM-DD');
        const currencyCode = req.params.currencyCode;
        const response = await axios.get( `https://www.bankofcanada.ca/valet/observations/FXCAD${currencyCode}/json?start_date=${Date}&end_date=${Date}`)
        if(response.data.observations.length === 0){
            return res.status(404).json({
                status: 'fail',
                resultLength: response.data.observations.length
            })
        }
        res.status(200).json({
            status: 'success',
            resultLength: response.data.observations.length,
            exchangeRate: response.data.observations[0][`FXCAD${currencyCode}`].v
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
});

app.get('/api/v1/exchangeRatesWithdate', async(req, res, next) => {
    try{
        if(req.query){
            const { date, currencyCode} = req.query;
            const response = await axios.get( `https://www.bankofcanada.ca/valet/observations/FXCAD${currencyCode}/json?start_date=${date}&end_date=${date}`)
            if(response.data.observations.length === 0){
                return res.status(404).json({
                    status: 'fail',
                    resultLength: response.data.observations.length
                })
            }
            res.status(200).json({
                status: 'success',
                resultLength: response.data.observations.length,
                exchangeRate: response.data.observations[0][`FXCAD${currencyCode}`].v
            })
        }
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
})

module.exports = app;


