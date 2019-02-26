'use strict'
const express = require('express');
const fs = require('fs');
const pages = __dirname + '/../../views/pages/';

const config = express.Router();

config.get('/refreshTemplates', updateConfig);

async function updateConfig(req, res){
  let fileNames = {};
  fs.readdir(pages, (err, files) => {
    if(err){
      console.log(err);
    }else{
      files.forEach(function(file, index){
        let fileName = file.split('.', 1);
        fileNames[Number(index)] = fileName.toString();
      });
      res.send(JSON.stringify(fileNames));
    }
  });
}

module.exports = {
  config: config
}
