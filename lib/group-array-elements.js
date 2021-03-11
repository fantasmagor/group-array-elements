'use strict';

/*!
 * groupArrayElements
 * Copyright(c) 2021 Arkadiusz Jablonski
 * MIT Licensed
 */

/**
 * Return array elements grouped as sub-arrays defined by the second argument
 *
 * @param {Array} arr
 * @param {number} partCount
 * @returns {Array} array of chunked arrays
 */
const groupArrayElements = (arr, partCount) => {
  // First argument is not an array, throw an error
  if (!Array.isArray(arr)) {
    throw Error('First argument is not an array');
  }

  // second argument is not an intiger, throw an error
  if (partCount !== parseInt(partCount)) {
    throw Error('Second argument is not an integer');
  }

  // second argument is not 0 or positive, throw an error
  if (partCount < 0) {
    throw Error('Second argument is not a positive value');
  }

  // if number of parts is 0 then nothing to do, the response is always []
  if (partCount === 0) {
    return [];
  }

  // calculate partSize
  const arraySize = arr.length;
  const partSize = Math.round(arraySize / Math.min(partCount, arraySize));
  const res = [];

  // split given array to chunks with size of calculated partSize value
  for (let i = 0; i < arraySize; i += partSize) {
    res.push(arr.slice(i, i + partSize));
  }

  return res;
}

module.exports = groupArrayElements;
