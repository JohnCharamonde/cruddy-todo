const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => { // defined at function invocation time
  fs.readFile(exports.counterFile, (err, fileData) => {
    // console.log('fileData', fileData)
    if (err) { // If 404,
      callback(null, 0); // Callback returns 0
    } else {
      callback(null, Number(fileData));
      // console.log(callback(null, fileData));
    }
  });
};


const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

// Rewrite getNextUniqueId to make use of readCounter and
// writeCounter functions
exports.getNextUniqueId = (callback) => {
//   console.log('counter: ', counter); // 0
//   writeCounter(readCounter((err, id) => {
//     if (err) {
//       console.log('error');
//     } else {
//       console.log('this is Number(id)', Number(id));
//       return Number(id) + 1;
//     }
//   }), callback(null, zeroPaddedNumber(counter)));


  readCounter((err, id) => {
    // console.log('id', id);
    writeCounter(Number(id)+ 1, () => {
      callback(null, zeroPaddedNumber(Number(id) + 1));
    })
  });
  // (count) => {callback(null, count)}


  // var value = readCounter(callback);
  // writeCounter(counter, readCounter(callback));
  // readCounter(callback);


  // }


};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
