const express = require('express');
const router = express.Router({ mergeParams: true });

const Productsitem = require('../controllers/Productsitem');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const Products = require('../models/ProductItem');

router.route('/')
    .get(catchAsync(Productsitem.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(Productsitem.createCampground))

router.get('/new', isLoggedIn, Productsitem.renderNewForm)

router.route('/:id')
    .get(catchAsync(Productsitem.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(Productsitem.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(Productsitem.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(Productsitem.renderEditForm))

module.exports = router;