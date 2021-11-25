const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())

app.get('/', function (httpRequest, httpResponse) {
    let data = {
        message: "Hello World"
    };
    return httpResponse.json(data);
});

app.get('/param', function (httpRequest, httpResponse) {
    let key1 = httpRequest.query.key1;
    let key2 = httpRequest.query.key2;
    let data = {
        message: key1 + " " + key2
    };
    return httpResponse.json(data);
});

app.listen(8080, function (err) {
    if (err) {
        console.error(err)
    }
});