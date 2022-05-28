const Products = require('../models/ProductItem');
const { cloudinary } = require("../cloudinary");
const express = require('express');
const router = express.Router({ mergeParams: true });
const { quickSort, quickSortReverse } = require('./Sorting');

module.exports.index = async(req, res) => {
    const Category = req.params.product;
    const Productsitem = await Products.find({ category: Category }).populate('popupText');
    quickSortReverse(Productsitem, 0, Productsitem.length - 1);

    res.render('Productsitem/index', { Productsitem, Category })
}

module.exports.renderNewForm = (req, res) => {
    res.render('Productsitem/new');
}

module.exports.createCampground = async(req, res, next) => {

    const Productsitem = new Products(req.body.Productsitem);
    Productsitem.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    Productsitem.author = req.user._id;
    await Productsitem.save();

    req.flash('success', 'Successfully made a new Productsitem!');
    res.redirect(`/Productsitem/${Productsitem._id}`)
}

module.exports.showCampground = async(req, res, ) => {
    const Category = req.params.product;
    const AllProducts = await Products.find({ category: Category }).populate('popupText');
    quickSort(AllProducts, 0, AllProducts.length - 1);
    const Productsitem = await Products.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!Productsitem) {
        req.flash('error', 'Cannot find that Productsitem!');
        return res.redirect('/Productsitem');
    }
    Productsitem.TotalViews = Productsitem.TotalViews + 1;
    await Productsitem.save();

    res.render('Productsitem/show', { Productsitem, AllProducts });
}

module.exports.renderEditForm = async(req, res) => {
    const { product, id } = req.params;

    const Productsitem = await Products.findById(id)
    if (!Productsitem) {
        req.flash('error', 'Cannot find that Productsitem!');
        return res.redirect('/req.params.product/Productsitem');
    }
    res.render('Productsitem/edit', { Productsitem, product });
}

module.exports.updateCampground = async(req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const Productsitem = await Products.findByIdAndUpdate(id, {...req.body.Productsitem });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    Productsitem.images.push(...imgs);
    await Productsitem.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await Productsitem.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated Productsitem!');
    res.redirect(`${product}/Productsitem/${Productsitem._id}`)
}

module.exports.deleteCampground = async(req, res) => {
    const { product, id } = req.params;
    await Products.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted Productsitem')
    res.redirect(`${product}/Productsitem`);
}