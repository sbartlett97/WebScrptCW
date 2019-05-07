'use strict'
/*
UP777815 Web Script Coursework 2019
*/


//import required modules
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const handler = require('./model');
const imgRouter = express.Router();

//setup uploader parameters
const uploader = multer({
  dest: 'public/images/',
  limits: {
    fields: 10,
    fileSize: 1024*1024*20,
    files: 1
  }
});

//set the method and path to listen on
imgRouter.post('/upload', uploader.single('picfile'), uploadPicture);


//function to handle uploading of images for pages
async function uploadPicture(req, res){

  //ask the handler to upload the file
  try{
    const retval = await handler.uploadPicture(req.file, req.body.title);

    //if we are successful, build the page data that will display the image
    let newPage = {title: `${req.body.title}`,
                   data: {
                     type: 'image',
                     url: `${retval}`
                   }
                 };

    //read the existing json file so we can add to it
    fs.readFile('server/api/pages.json', 'utf-8', (err, data) => {
      if(err)
        throw err
      data = JSON.parse(data);
      let pages = data.pages;

      //add our new page
      pages.push(newPage);
      data.pages = pages;

      //write changes to the file
      fs.writeFile('server/api/pages.json', JSON.stringify(data), 'utf-8', (err, data) =>{
        if(err)
          throw err

        //redirect the user back to the config page
        res.redirect(303, '/config');
      });
    });
  }catch(e){
    //if we have an error handle it
    error(res, e);
  }
}

//error handler
function error(res, msg){

  //internal error status
  res.sendStatus(500);
  //log the error
  console.error(msg);
}


module.exports = {
  imgRouter: imgRouter
}
