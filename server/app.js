const express = require('express')
const app = express()
const port = 3333
const request = require('request');
const btoa = require('btoa');
var userId = '604618';
var apiKey = 'de5a4d8efc792d8c1b80cb4915f53432';
var data = {
  date: 25,
  month: 12,
  year: 1988,
  hour: 4,
  minute: 0,
  latitude: 25.123,
  longitude: 82.34,
  timezone: 5.5
}
var headers = {
  "authorization": "Basic " + btoa(userId+":"+apiKey),
  "Content-Type":'application/json'
};
app.get('/', (req, res) => {

  request.post({
    url:'https://json.astrologyapi.com/v1/biorhythm', 
    formData: data,
    headers: headers,
    dataType:'json',
  }, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    console.log('Upload successful!  Server responded with:', body);
  });
  res.send('Hello World!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))