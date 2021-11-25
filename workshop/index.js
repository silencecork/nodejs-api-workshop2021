const request = require('request');

var options = {
  method: 'GET',
  url: 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
};
request(options, function (err, response, body) {
  if (err) {
    console.error(err);
    return;
  }
  let data = JSON.parse(body);
  console.log(Array.isArray);
  // for (i = 0; i < data.length; i++) {
  //   let item = data[i];
  //   console.log(item.sna + " " + item.sbi);
  // }
  data.forEach(function (item) {
    console.log(item.sna + " " + item.sbi);
  });
});