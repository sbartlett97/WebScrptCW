'use strict'
/*
UP777815 Web Script Coursework 2019
*/

//import required modules
const fs = require('fs');
const { promisify } = require('util');

// create an async fs.rename and unlink
const renameAsync = promisify(fs.rename);
const unlinkAsync = promisify(fs.unlink);

// export a function to upload the file
module.exports.uploadPicture = async (reqFile, title)=>{

  //create the filename
  const fileExt = reqFile.mimetype.split('/')[1] || 'png';
  const newFilename = title + '.' + fileExt;

  try{
    //move the file where we want it
    await renameAsync(reqFile.path, 'public/images/' + newFilename);
  }catch(e){
    //handle errors
    throw ['failed to move incoming file', e];
  }
    //return the filename for use in pictures.js
   return 'images/' + newFilename;
};

module.exports.deletePicture = async (url) => {
  console.log(`public/${url}`);
  try {
    await unlinkAsync(`public/${url}`);
  } catch (e) {
    throw ['failed fs delete of ' + url, e];
  }
};
