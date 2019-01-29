'use strict'
const fs = require('fs');
const ip = require('ip');
const path = require('path');
const publicIPTxt = path.join(__dirname, '..', 'public', 'ip.text');
const privateIPTxt = path.join(__dirname, '..', 'private', 'ip.text');

module.exports.saveIP = function(){
  let ipAddr = ip.address();
  fs.writeFile(publicIPTxt, ipAddr, (err) => {
    if (err) throw err;
    console.log('ip saved');
  });
  fs.writeFile(privateIPTxt, ipAddr, (err) => {
    if (err) throw err;
    console.log('ip saved');
  });
}
