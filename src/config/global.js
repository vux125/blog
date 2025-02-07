const bodyParser = require('body-parser');
const path = require('path');   
const express = require('express');
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser');

module.exports = function config(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '../public')));
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');
  app.use(methodOverride('_method'));
  app.use(cookieParser());
}

