const express = require('express');
const app = express();
const request = require('request');
const cors = require('cors');

app.use(cors());

app.get('/ubike', function (httpRequest, httpResponse) {
    let count = httpRequest.query.bike_num;

    let options = {
        url: 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json',
        method: 'GET'
    }

    request(options, function (err, response, body) {
        if (err) {
            console.error(err);
            return httpResponse.json({
                'message': 'Error'
            });
        }

        let data = JSON.parse(body);
        let matchResult = [];
        data.forEach(function (item) {
            if (item.sbi > count) {
                matchResult.push(item.sna);
            }
        });

        return httpResponse.json(matchResult);
    });
});

app.listen(8000, function (err) {
    if (err) {
        console.error(err);
    }
});
