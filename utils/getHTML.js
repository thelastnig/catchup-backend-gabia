var express = require('express');
const axios = require('axios');

const getHtml = async (url) => {
    try {
      return await axios.get(url);

    } catch (error) {
      console.error(error);
    }
  };

  module.exports = getHtml;