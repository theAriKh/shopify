const express = require('express');
const app = express();
const nf = require('node-fetch');
const url = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000";
const path = require('path');

app.use('/', express.static(path.join(__dirname, 'angular')));

app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Header', "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', "GET, OPTIONS");
  next();
})

app.use('/api/get', (req, res, next) => {
  console.log("getItems", req.url);
  nf(url).then(data => {
      return data.json();
  }).then(json => {
    res.send(json);

  }).catch(error => {
      console.log("couldn't fetch data", error);
  });
})

app.use((req, res, next)=>{
  res.sendFile(path.join(__dirname,'angular', 'index.html'))
})

module.exports = app;
